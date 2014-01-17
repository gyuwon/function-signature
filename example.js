var fs = require('./function-signature');

function printFormation(front, left, right) {
  console.log('front: %s, left: %s, right: %s', front, left, right);
}

// Call printFormation function with named parameter set
fs.invoke(null, printFormation, { front: 'ironman', left: 'hulk', right: 'thor' });

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
