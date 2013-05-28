# function-signature

function-signature is a library for Javascript function signatures. The library exports main function that extracts the signature that contains a name and a list of parameters of function.

This library is made to use in development of a convention based framework.

## Installation

    $ npm install function-signature
    
## Usage

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

## License

The MIT License (MIT)

Copyright (c) 2013 Yi Gyuwon <gyuwon@live.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
