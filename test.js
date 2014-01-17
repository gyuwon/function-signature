/* jshint -W030 */

var should = require('should')
  , fromjs = require('fromjs')
  , fs = require('./function-signature');

describe('function-signature', function () {
  it('should return the signature object of the specified function', function () {
    // Setup
    var myFunc = function (ironman, hulk, thor) {};

    // Exercise
    var sig = fs(myFunc);

    // Verify
    should.exist(sig);
  });

  describe('signature', function () {
    var func = function myFunc(ironman, hulk, thor) {}
      , sig = fs(func);

    it("should have 'name' property that contains the name of the function", function () {
      // Setup

      // Exercise

      // Verify
      sig.should.have.property('name', func.name);
    });

    it("should have 'params' property", function () {
      // Setup

      // Exercise

      // Verify
      sig.should.have.property('params');
    });

    describe('params', function () {
      it("should have 'length' property that contains the count of parameters of the function", function () {
        // Setup

        // Exercise

        // Verify
        sig.params.should.have.property('length', func.length);
      });

      it('should have all list of parameters of the function', function () {
        // Setup
        var params = [];
        params.push.apply(params, sig.params);

        // Exercise

        // Verify
        ['ironman', 'hulk', 'thor'].forEach(function (name) {
          fromjs(params).any("$name === '" + name + "'").should.be.true;
        });
      });

      it("should have 'map' property", function () {
        // Setup

        // Exercise

        // Verify
        sig.params.should.have.property('map');
      });

      describe('map', function () {
        it('should have all indices of parameters', function () {
          // Setup
          var verification = new Array(func.length)
            , indices = [];

          // Exercise
          for (var name in sig.params.map) {
            var index = sig.params.map[name];
            indices[index] = name;
            if (sig.params[index].name === name) {
              verification[index] = true;
            }
          }

          // Verify
          indices.length.should.equal(func.length);
          fromjs(verification).all('$ === true').should.be.true;
        });
      });
    });
  });

  describe('invoke', function () {
    it('should call a function with the first argument as the context', function () {
      // Setup
      var context = {}
        , $this;
      var func = function () {
        $this = this;
      };

      // Exercise
      fs.invoke(context, func);

      // Verify
      should.exist($this);
      $this.should.be.equal(context);
    });

    it('should call a function with a parameter set', function () {
      // Setup
      var formation = {};
      var func = function (front, left, right) {
        this.front = front;
        this.left = left;
        this.right = right;
      };
      var params = { front: 'ironman', left: 'hulk', right: 'thor' };

      // Exercise
      fs.invoke(formation, func, params);

      // Verify
      for (var name in params) {
        formation.should.have.property(name, params[name]);
      }
    });

    it('should call a function with the signature and a parameter set', function () {
      // Setup
      var formation = {};
      var func = function (front, left, right) {
        this.front = front;
        this.left = left;
        this.right = right;
      };
      var params = { front: 'ironman', left: 'hulk', right: 'thor' }
        , sig = fs(func);

      // Exercise
      fs.invoke(formation, func, sig, params);

      // Verify
      for (var name in params) {
        formation.should.have.property(name, params[name]);
      }
    });
  });

  describe('create', function () {
    it('should create a new instance of a function with a parameter set', function () {
      // Setup
      var Formation = function Formation (front, left, right) {
        this.front = front;
        this.left = left;
        this.right = right;
      };
      var params = { front: 'ironman', left: 'hulk', right: 'thor' };

      // Exercise
      var formation = fs.create(Formation, params);

      // Verify
      should.exist(formation);
      formation.should.have.property('constructor', Formation);
      for (var name in params) {
        formation.should.have.property(name, params[name]);
      }
    });

    it('should create a new instance of a function with the signature and a parameter set', function () {
      // Setup
      var Formation = function Formation (front, left, right) {
        this.front = front;
        this.left = left;
        this.right = right;
      };
      var params = { front: 'ironman', left: 'hulk', right: 'thor' }
        , sig = fs(Formation);

      // Exercise
      var formation = fs.create(Formation, sig, params);

      // Verify
      should.exist(formation);
      formation.should.have.property('constructor', Formation);
      for (var name in params) {
        formation.should.have.property(name, params[name]);
      }
    });
  });
});
