# function-signature
function-signature is a library for Javascript function signatures. The library exports main function that extracts the signature that contains a name and a list of parameters of function. This library made is for the convention based JavaScript programming.

## Installation
```
$ npm install function-signature
```

## Usage
```javascript
var fs = require('function-signature');

function printFormation(front, left, right) {
  console.log('front: %s, left: %s, right: %s', front, left, right);
}

// Call printFormation function with named parameter set
fs.invoke(null, printFormation, { front: 'ironman', left: 'hulk', right: 'thor' });
// front: ironman, left: hulk, right: thor

function Formation(front, left, right) {
  this.front = front;
  this.left = left;
  this.right = right;
  this.print = function () {
    printFormation(this.front, this.left, this.right);
  };
}

// Create an instance of Formation function with named parameter set
var formation = fs.create(Formation, { front: 'ironman', left: 'hulk', right: 'thor' });

formation.print();
// front: ironman, left: hulk, right: thor
```

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
