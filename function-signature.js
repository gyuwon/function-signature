/*
 *
 * The MIT License (MIT)
 * 
 * Copyright (c) 2013 Yi Gyuwon <gyuwon@live.com>
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */


/**
 * Definition of error messages.
 */
var err_msg_invalid_operation = 'Invalid operation';
var err_msg_invalid_regex = 'The regular expression is invalid.';
var err_msn_arg_fn_not_function = 'The argument \'fn\' is not a function.';


/**
 * Function header regular expression.
 */
var whiteSpaces = '\\s*'
  , firstIdChar = '[A-Za-z_\\$]'
  , nonFirstIdChar = '[A-Za-z0-9_\\$]'
  , idToken = whiteSpaces + firstIdChar + nonFirstIdChar + '*'
  , regex = new RegExp('^' + whiteSpaces + 'function(' + idToken + ')?' + whiteSpaces +'\\(' + whiteSpaces + '(' + idToken + '(' + whiteSpaces + ',' + idToken + ')*)?' + whiteSpaces + '\\)');


/**
 * The internal shorcut of Object.defineProperty function.
 */
function _prop(target, key, value, options) {
  if (typeof options !== 'string') {
    options = '';
  }
  options = options.toLowerCase();
  Object.defineProperty(target, key, {
    enumerable: options.indexOf('e') !== -1,
    writable: options.indexOf('w') !== -1,
    configurable: options.indexOf('c') !== -1,
    value: value
  });
}


/**
 * Initialize a new instance of 'Signature'.
 *
 * Parameters
 * - fn: A source function to analyze a signature.
 */
function Signature(fn) {
  if (typeof fn !== 'function') {
    return;
  }

  var self = this
    , fnString = fn.toString()
    , match = fnString.match(regex);
  if (!match) {
    throw new Error(err_msg_invalid_regex);
  }

  _prop(self, 'name', fn.name);
  if (match[1] && fn.name !== match[1].trim()) {
    throw new Error(err_msg_invalid_regex);
  }

  _prop(self, 'params', {}, 'e');
  _prop(self.params, 'map', {});
  var params = [];
  if (match[2]) {
    var paramsSource = match[2].split(',');
    for (var i in paramsSource) {
      var name = paramsSource[i].trim();
      var param = {};
      _prop(param, 'name', name, 'e');
      params.push(param);
    }
  }
  if (fn.length !== params.length) {
    throw new Error(err_msg_invalid_operation);
  }
  params.forEach(function (param, i) {
    _prop(self.params, i, param, 'e');
    _prop(self.params.map, param.name, i, 'e');
  });

  _prop(self.params, 'length', params.length);

  _prop(self, 'toString', function () {
    if (this instanceof Signature !== true) {
      throw new Error(err_msg_invalid_operation);
    }
    var s = this.name + '(';
    for (var i = 0; i < this.params.length; i++) {
      if (i !== 0) {
        s += ', ';
      }
      s += this.params[i].name;
    }
    s += ')';
    return s;
  });
}


/**
 * Construct the signature of the specified function.
 * The function can be called with named parameters using the signature.
 * 
 * Returns: An object containing information about the signature of the parameter 'fn'.
 *
 * Parameters
 * - fn: A source function to analyze a signature.
 */
var functionSignature = function (fn) {
  return new Signature(fn);
};


/**
 * Returns a value that indicates whether the specified object is a function signature.
 *
 * Returns: true if the specified object is a function signature; otherwise, false.
 *
 * Parameters:
 * - sig: The object to test.
 */
functionSignature.isSignature = function (sig) {
  return sig instanceof Signature;
};

var cache = {};

var args = function (fn, sig, params) {
  if (typeof fn !== 'function') {
    throw new Error(err_msn_arg_fn_not_function);
  }

  if (functionSignature.isSignature(sig) !== true) {
    params = sig;
    sig = cache[fn];
    if (!sig) {
      sig = functionSignature(fn);
      cache[fn] = sig;
    }
  }

  params = params || {};

  var args = [];
  for (var i = 0; i < sig.params.length; i++) {
    args[i] = undefined;
  }
  for (var n in params) {
    args[sig.params.map[n]] = params[n];
  }
  return args;
};


/**
 * Call specified function with named paramaters.
 *
 * Returns: The result of the function invocation.
 *
 * Parameters:
 * - $this: The value of this provided for the call to fn.
 * - fn: The function to call.
 * - [sig]: The function signature.
 * - params: The object that contains named parameters.
 */
functionSignature.invoke = function ($this, fn, sig, params) {
  return fn.apply($this, args(fn, sig, params));
};


/**
 * Create new instance of specified function with named parameters.
 *
 * Returns: A new instance of the function.
 *
 * Parameters
 * - fn: The function to create a new instance.
 * - [sig]: The function signature.
 * - params: The object that contains named parameters.
 */
functionSignature.create = function (fn, sig, params) {
  return new (fn.bind.apply(fn, [fn].concat(args(fn, sig, params))))();
};


module.exports = functionSignature;
