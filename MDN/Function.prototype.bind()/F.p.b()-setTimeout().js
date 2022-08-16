/* eslint-disable prefer-destructuring */
/* eslint-disable no-throw-literal */
/* eslint-disable vars-on-top */
/* eslint-disable new-cap */
/* eslint-disable func-names */
/* eslint-disable no-console */
/* eslint-disable lines-between-class-members */
setTimeout(() => console.log("testing setTimeout..."));

// - With setTimeout()
// By default within setTimeout(), the 'this' keyword will be set to the window
// (or global) object. When working with class methods that require 'this' to refer
// to class instances, you may explicitly bind 'this' to the callback function,
// in order to maintain the instance.
class LateBloomer {
  constructor() {
    this.petalCount = Math.floor(Math.random() * 12) + 1;
  }
  bloom() {
    // Declare bloom after a delay of 1 second
    setTimeout(this.declare, 1000);
    setTimeout(this.bondDeclare.bind(this), 1000);
  }
  declare() {
    console.log(this);
    // Timeout { _idleTimeout: 1000, ...
    // >>> Here the default 'this' seems to be the the Timeout object <<<
    console.log(`
    I am a beautiful flower with ${this.petalCount} petals!`);
    // I am a beautiful flower with undefined petals!
  }
  bondDeclare() {
    console.log(this);
    // LateBloomer { petalCount: N }
    console.log(`
    I am a beautiful flower with ${this.petalCount} petals!`);
    // I am a beautiful flower with N petals!
  }
}

const flower = new LateBloomer();
flower.bloom();
//  after 1 second, calls 'flower.declare()'

// - Bound functions used as constructors
// Warning: This section demonstrates JavaScript capabilities and documents some
// edge cases of the bind() method.

// The methods shown below are not the best way to do things, and probably should
// not be used in any production environment.

// Bound functions are automatically suitable for use with the new operator to
// construct new instances created by the target function. When a bound function
// is used to construct a value, the provided 'this' is ignored.

// However, provided arguments are still prepended to the constructor call:
function Point(x, y) {
  this.x = x;
  this.y = y;

  // When a function is used as a constructor (with the new keyword), its 'this'
  // is bound to the new object being constructed. If the function has a return
  // statement that returns an object, that object will be the result of the
  // 'new' expression.
  return this;
}

Point.prototype.toString = function () {
  return `${this.x},${this.y}`;
};

const p = new Point(1, 2);
console.log(p.toString());
// '1,2'

let YAxisPoint = Point.bind(null, 0 /* x */);
try {
  console.log(new YAxisPoint(2).toString());
  // 0,2
  // whit 'new' the thisArg (null) is ignored

  console.log(YAxisPoint(2).toString()); // error at null.x = 0
} catch (error) {
  console.log(error);
  // [TypeError: Cannot set properties of null (setting 'x')]
}

const emptyObj = {};
YAxisPoint = Point.bind(emptyObj, 0 /* x */);
console.log(YAxisPoint(5));
// { x: 0, y: 5 }
console.log(emptyObj);
// { x: 0, y: 5 }

const axisPoint = new YAxisPoint(6);
console.log(axisPoint.toString());
// '0,6'
console.log(emptyObj);
// { x: 0, y: 5 }

console.log(axisPoint instanceof Point);
// true
console.log(axisPoint instanceof YAxisPoint);
// true
console.log(new YAxisPoint(17, 42) instanceof Point);
// true

const noEmptyObj = { x: 1, y: 2, z: 3 };
const BoundPoint = Point.bind(noEmptyObj, 4 /* x */);
console.log(BoundPoint(7));
// { x: 4, y: 7, z: 3 }
console.log(noEmptyObj);
// { x: 4, y: 7, z: 3 }

console.log(new BoundPoint(8));
// Point { x: 4, y: 8 }
// 'new' creates a new Point object with the provided args, bound argThis is discarded

console.log(new BoundPoint(9).toString());
// 4,9

// Note that you need not do anything special to create a bound function for use
// with new.

// The corollary is that you need not do anything special to create a bound
// function to be called plainly, even if you would rather require the bound
// function to only be called using 'new'.
//  Example can be run directly in your JavaScript console
//  ...continued from above

//  Can still be called as a normal function
//  (although usually this is undesired)
YAxisPoint(13);

console.log(`${emptyObj.x},${emptyObj.y}`);
// 0,13
// If you wish to support the use of a bound function only using 'new', or only
// by calling it, the target function must enforce that restriction.

// Enforcing 'new'
function EnforcedNew() {
  // this check verifies whether 'this' references an object created by our
  // constructor function, and if not, the constructor function is called again
  // but this time using the new operator.
  if (this instanceof EnforcedNew === false) {
    return new EnforcedNew();
  }
  this.prop1 = "a prop";
}

// a plane call creates a new instance of EnforcedNew
const newObjEN = EnforcedNew();
console.log(newObjEN instanceof EnforcedNew);
// true
console.log(newObjEN.prop1);
// a prop

// verifying the whether calling with 'new' or not
function TestIfNew() {
  if (!new.target) {
    throw Error("TestIfNew() must be called with new");
  }

  if (new.target) {
    throw Error("TestIfNew() can't be instantiated");
  }
  console.log("do something");
}

try {
  console.log(TestIfNew());
} catch (error) {
  console.log(error);
}

try {
  console.log(new TestIfNew());
} catch (error) {
  console.log(error);
}

// - Creating shortcuts
// bind() is also helpful in cases where you want to create a shortcut to a
// function which requires a specific 'this' value.

// Take Array.prototype.slice(), for example, which you want to use for converting
// an array-like object to a real array. You could create a shortcut like this:
const slice = Array.prototype.slice;
const arrLike = "string";
console.log(slice.apply(arrLike));
// [ 's', 't', 'r', 'i', 'n', 'g' ]

// With bind(), this can be simplified.
// In the following piece of code, slice() is a bound function to the apply()
// function of Function, with the 'this' value set to the slice() function of
// Array.prototype. This means that additional apply() calls can be eliminated:
//  same as "slice" in the previous example
const unboundSlice = Array.prototype.slice;
const slice2 = Function.prototype.apply.bind(unboundSlice);

console.log(slice2(arrLike));
// [ 's', 't', 'r', 'i', 'n', 'g' ]
