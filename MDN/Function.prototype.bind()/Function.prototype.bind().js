/* eslint-disable prettier/prettier */
/* eslint-disable spaced-comment */
/* eslint-disable no-promise-executor-return */
/* eslint-disable no-eval */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable prefer-template */
/* eslint-disable new-cap */
/* eslint-disable object-shorthand */
/* eslint-disable func-names */
// Function.prototype.bind()
// The bind() method creates a new function that, when called, has its 'this'
// keyword set to the provided value, with a given sequence of arguments preceding
// any provided when the new function is called.
let module = {
  x: 42,
  getX: function () {
    console.log(this);
    return this?.x;
  },
};

const unboundGetX = module.getX;
console.log(unboundGetX());
// The function gets invoked at the global scope
// expected output: undefined

let boundGetX = unboundGetX.bind(module);
console.log(boundGetX());
// expected output: 42

// - Syntax
//  bind(thisArg)
//  bind(thisArg, arg1, /* …, */ argN)
//
// Parameters
// thisArg
//  The value to be passed as the this parameter to the target function func when
//  the bound function is called. If the function is not in strict mode, null
//  and undefined will be replaced with the global object, and primitive values
//  will be converted to objects. The value is ignored if the bound function is
//  constructed using the new operator.

// arg1, …, argN Optional
//  Arguments to prepend to arguments provided to the bound function when invoking func.

// Return value
//  A copy of the given function with the specified this value, and initial
// arguments (if provided).

// - Description
// The bind() function creates a new bound function. Calling the bound function
// generally results in the execution of its wrapped function. The bound function
// will store the parameters passed — which include the value of 'this' and the
// first few arguments — as its internal state. These values are stored in advance,
// instead of being passed at call time. You can generally see
// const boundFn = fn.bind(thisArg, arg1, arg2) as being equivalent to
// const boundFn = (...restArgs) => fn.call(thisArg, arg1, arg2, ...restArgs).

// A bound function may also be constructed using the new operator. Doing so acts
// as though the target function had instead been constructed. The provided 'this'
// value is ignored, while prepended arguments are provided to the emulated function.

// - Examples
// Creating a bound function
// The simplest use of bind() is to make a function that, no matter how it is called,
// is called with a particular 'this' value.

// A common mistake for new JavaScript programmers is to extract a method from
// an object, then to later call that function and expect it to use the original
// object as its 'this' (e.g., by using the method in callback-based code).

// Without special care, however, the original object is usually lost. Creating
// a bound function from the function, using the original object, neatly solves
// this problem:
try {
  this.x = 9; // 'this' refers to the global object (e.g. 'window') in non-strict mode
} catch (error) {
  console.log(error);
}
// Note: If you run this example in strict mode (e.g. in ECMAScript modules, or
// through the "use strict" directive), the global 'this' value will be undefined.

var mode = (eval("var __temp = null"), typeof __temp === "undefined")
  ? "strict"
  : "non-strict";
console.log("mode: " + mode);
// mode: strict

module = {
  x: 81,
  getX() {
    return this.x;
  },
};

console.log(module.getX());
//  returns 81

const objX = {
  x: 18,
};
objX.retrieveX = module.getX;
console.log(objX.retrieveX());
//  returns 18; the function gets invoked at the object scope

//  Create a new function with 'this' bound to module
//  New programmers might confuse the objX's property 'x' with module's property 'x'
objX.boundGetX = objX.retrieveX.bind(module);
console.log(objX.boundGetX());
//  returns 81

const retrieveX = module.getX;
try {
  console.log(retrieveX());
} catch (error) {
  console.log(error);
  // [TypeError: Cannot read properties of undefined (reading 'x')]
}
// If you run this in a Node CommonJS module, the top-scope 'this' will be pointing
// to module.exports instead of globalThis, regardless of being in strict mode or not.
// However, in functions, the reference of unbound 'this' still follows the rule
// of "globalThis in non-strict, undefined in strict". Therefore, in non-strict
// mode (default), retrieveX will return undefined because this.x = 9 is writing
// to a different object (module.exports) from what getX is reading from (globalThis).

// - Partially applied functions
// The next simplest use of bind() is to make a function with pre-specified
// initial arguments. These arguments (if any) follow the provided 'this' value
// and are then inserted at the start of the arguments passed to the target function,
// followed by whatever arguments are passed to the bound function at the time
// it is called.
function list(...args) {
  return args;
}

function addArguments(arg1, arg2) {
  return arg1 + arg2;
}

const list1 = list(1, 2, 3);
console.log(list1);
//  [1, 2, 3]

const result1 = addArguments(1, 2);
console.log(result1);
//  3

// Create a function with a preset leading argument
const leadingThirtySevenList = list.bind(null, 37);
const list2 = leadingThirtySevenList();
console.log(list2);
//  [37]
const list3 = leadingThirtySevenList(1, 2, 3);
console.log(list3);
//  [37, 1, 2, 3]

// Create a function with a preset first argument.
const addThirtySeven = addArguments.bind(null, 37);
const result2 = addThirtySeven(5);
console.log(result2);
//  37 + 5 = 42

const result3 = addThirtySeven(5, 10);
console.log(result3);
//  37 + 5 = 42
//  (the second argument 10 is ignored)
