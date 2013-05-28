var signature = require('./function-signature');

function web_service(cplusplus, java) {
	return cplusplus >= 3 && java >= 5;
}

function win8_app(csharp, javascript) {
	return csharp >= 5 || javascript >= 2;
}

function data_processor(scalar) {
	return scalar >= 4;
}

var projects = [web_service, win8_app, data_processor];

var experience = {
	cplusplus: 3,
	csharp: 4,
	java: 6,
	javascript: 3
};

for (var i in projects) {

	var p = projects[i];

	// Call a function with named parameters.
	if (signature.invoke(null, p, experience)) {
		console.log(p.name);
	}

}
