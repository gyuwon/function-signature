var signature = require('./function-signature');

function f1() {}
function f2(x, y) { return x + y; }

var functions = [
	f1,
	f2,
	function (x1, y1, x2, y2) {}
];

for (var i in functions) {
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
	}
}

var sig = signature(f2);
console.log(signature.invoke(this, f2, sig, { x: 0, y: 1 }));
console.log(signature.invoke(this, f2, { x: 1, y: 2, z: 3}));