/* eslint-disable new-cap */
/* eslint-disable prefer-template */
// When a function is used as a constructor (with the new keyword), its 'this'
// is bound to the new object being constructed. If the function has a return
// statement that returns an object, that object will be the result of the
// 'new' expression.
function FuncReturningObj() {
  console.log(this);
  this.a = 73; // value discarded
  return { a: 38 };
}

let obj = new FuncReturningObj();
console.log(obj.a); // 38

// Otherwise, the result of the 'new' expression is the object currently bound
// to 'this'.
function FuncWithoutReturn() {
  console.log(this);
  this.a = 37;
}

obj = new FuncWithoutReturn();
console.log(obj.a); // 37

// When a bounded function is used as a constructor...
function BaseFunc() {
  console.log(this);
  console.log(this instanceof BaseFunc);
  this.c3 = 54;
  console.log("this.c3: " + this.c3);
  console.log("this.bound: " + this.bound);
}

const BoundFunc = BaseFunc.bind({ bound: 44 });
BoundFunc(); // { bound: 44 }, false, 54, 44

// ...the bound value is ignored
obj = new BoundFunc(); // BaseFunc {}, true, 54, undefined

console.log("obj.c3: " + obj.c3); // 54
console.log("obj.bound: " + obj.bound); // undefined

console.log(obj instanceof BaseFunc);
// true

// bound func GetX and using it as constructor with 'new'
function GetX() {
  if (this) this.y = 24;
  console.log(this);
  return this?.x;
}
const objWithX = { x: 84 };
const BoundedGetX = GetX.bind(objWithX);
console.log(BoundedGetX());
// 84

// using the bound function with 'new'
// the function GetX isn't returning an object, then the current 'this'(the new
// object being created) is returned, so then the bound 'this'(objWithX) is ignored
const NewBoundedGetX = new BoundedGetX();
console.log(NewBoundedGetX);
// expected output: GetX { y: 24 }

console.log(NewBoundedGetX instanceof GetX);
// true

try {
  console.log(NewBoundedGetX.y);
  // 24
  NewBoundedGetX(); // error at calling an object as a function
} catch (error) {
  console.log(error);
  // [TypeError: newBoundGetX is not a function]
  // It seems 'new' creates an object of type GetX, but not a function
}
