var signature = require('./function-signature');



console.log('Extraction of function signatures...');

(function () {

	function f1() {}

	function f2(x, y) { return x + y; }

	function f3(
		x,
		y,
		z
	) {}

	/* Comments are not supported yet */
	function f4(
		/* Parameter x */x,
		// Parameter y
		y,
		/* Parameter z */
		z
	) {}

	function _f5($a) {}

	var functions = [
		Math.pow,
		f1,
		f2,
		f3,
		f4,
		_f5,
		function (x1, y1, x2, y2) {}
	];

	for (var i in functions) {
		console.log();
		try {
			var fn = functions[i];
			var s = signature(fn);
			console.log('Name: ' + s.name);
			console.log('Parameters');
			for (var i in s.params) {
				var p = s.params[i];
				console.log('- ' + p.name);
			}
		} catch (err) {
			console.log(err);
			console.log(fn.toString());
		}
	}

})();



console.log();
console.log();



console.log('Function calls via signatures...');

(function () {
	
	function square(x) {
		return x * x;
	}

	function sum(a, b) {
		return a + b;
	}

	var random = function (min, max) {
		var range = max - min;
		var r = Math.random();
		return min + Math.floor(r * range);
	}

	var functions = [sum, square];

	for (var i in functions) {
		console.log();
		var fn = functions[i];
		var sig = signature(fn);
		console.log(sig.toString());
		var namedParams = {};
		for (var j in sig.params) {
			namedParams[sig.params[j].name] = random(1, 11);
		}
		var result = signature.invoke(this, fn, sig, namedParams);
		var message = sig.name + '(';
		for (var j = 0; j < sig.params.length; j++) {
			if (j !== 0) {
				message += ', ';
			}
			var name = sig.params[j].name;
			message += (name + ': ' + namedParams[name]);
		}
		message += ') = ' + result;
		console.log(message);
	}

})();