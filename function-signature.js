var err_msg_invalid_operation = 'Invalid operation';
var err_msg_invalid_regex = 'The regular expression is invalid.';
var err_msn_arg_fn_not_function = 'The argument \'fn\' is not a function.';

function _prop(target, key, value, options) {
	if (typeof options !== 'string') {
		options = '';
	}

	Object.defineProperty(target, key, {
		enumerable: options.indexOf('e') !== -1,
		writable: options.indexOf('w') !== -1,
		configurable: options.indexOf('c') !== -1,
		value: value
	});
}

function signature() {}

var functionSignature = function (fn) {
	if (typeof fn !== 'function') {
		return;
	}
	var regex = /[ \t]*function([ \t]+[a-zA-Z][a-zA-Z0-9]*){0,1}[ \t]*\([ \t]*([ \t]*[a-zA-Z][a-zA-Z0-9]*([ \t]*,[ \t]*[a-zA-Z][a-zA-Z0-9]*)*)?[ \t]*\)/;
	var fnString = fn.toString();
	var match = fnString.match(regex);
	if (!match) {
		throw new Error(err_msg_invalid_regex);
	}
	var sig = new signature();
	_prop(sig, 'name', fn.name);
	if (match[1] && fn.name !== match[1].trim()) {
		throw new Error(err_msg_invalid_regex);
	}
	_prop(sig, 'params', {}, 'e');
	_prop(sig.params, 'map', {});
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
	for (var i in params) {
		var param = params[i]
		_prop(sig.params, i, param, 'e');
		_prop(sig.params.map, param.name, i, 'e');
	}
	_prop(sig.params, 'length', params.length);
	return sig;
};

functionSignature.isSignature = function (sig) {
	return sig instanceof signature;
}

var cache = {};

functionSignature.invoke = function ($this, fn, sig, params) {
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

	var args = [];
	for (var i = 0; i < sig.params.length; i++) {
		args[i] = undefined;
	}
	for (var n in params) {
		args[sig.params.map[n]] = params[n];
	}

	return fn.apply($this, args);
};

module.exports = functionSignature;
