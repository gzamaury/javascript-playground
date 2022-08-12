/* eslint-disable no-unused-vars */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-new */
/* eslint-disable no-constructor-return */

// https://www.npmjs.com/package/jsdom-quokka-plugin
({ plugins: ["jsdom-quokka-plugin"] });

// - Global context
// In the global execution context (outside of any function), this refers to the
// global object whether in strict mode or not.

// In Node, this refers to 'globalThis', try the next in a terminal:
// node -e "console.log('In Node, this === globalThis: ' + (this === globalThis))"

// In web browsers, the window object is also the global object:
let script = document.createElement("script");
script.innerHTML = `
  console.log("In a browser, this === window: " + (this === window)); // true

  a = 37;
  console.log("window.a: " + window.a); // 37

  this.b = "MDN";
  console.log("window.b: " + window.b)  // "MDN"
  console.log("b: " + b)         // "MDN"
`;
document.head.appendChild(script);

// - Function context
// Inside a function, the value of 'this' depends on how the function is called.
// In non-strict mode, and if 'this' is not set by use call() or apply(), 'this'
// will default to the global object, which is window
script = document.createElement("script");
script.innerHTML = `
  function f1() {
    return this;
  }
  console.log('non-strict, f1() === window: ' + (f1() === window));`;
document.head.appendChild(script);

// In strict mode, if 'this' is not set when entering an execution context,
// it remains as undefined
script = document.createElement("script");
script.innerHTML = `
  function f1() {
    'use strict'; // see strict mode
    return this;
  }
  console.log('In strict mode, f1() === undefined: ' + (f1() === undefined));`;
document.head.appendChild(script);

// In the example above, 'this' should be undefined, because f2 was called directly
// and not as a method or property of an object.
// This feature wasn't implemented in some browsers when they first started to
// support strict mode. As a result, they incorrectly returned the window object.
script = document.createElement("script");
script.innerHTML = `
  function f1() {
    'use strict'; // see strict mode
    return this;
  }
  console.log(
    'In strict mode, through an object, window.f1() === window: '
    + (window.f1() === window)
  );`;
document.head.appendChild(script);

// You can always get the global object using the global 'globalThis' property
// regardless of the current context in which your code is running
script = document.createElement("script");
script.innerHTML = `
  function f1() {
    return globalThis;
  }
  console.log(
    'globalThis, f1() === window: ' + (f1() === window)
  );`;
document.head.appendChild(script);

// - Class context
// The behavior of 'this' in classes and functions is similar, since classes are
// functions under the hood. Within a class constructor, 'this' is a regular object.
// All non-static methods within the class are added to the prototype of 'this':
class Example {
  constructor() {
    const proto = Object.getPrototypeOf(this);
    console.log(Object.getOwnPropertyNames(proto));
  }

  first() {}
  second() {}

  // Static methods are not properties of 'this', they are of the class itself.
  static third() {}
}

new Example(); // ['constructor', 'first', 'second']

// - Derived classes
// Unlike base class constructors, derived constructors have no initial 'this'
// binding. Calling super() creates a 'this' binding within the constructor and
// essentially has the effect of evaluating this = new Base();, where Base is
// the inherited class.
// Referring to 'this' before calling super() will throw an error.

// Derived classes must not return before calling super(), unless they return
// an Object or have no constructor at all.
class Base {}
class Good extends Base {}
class AlsoGood extends Base {
  constructor() {
    return { a: 5 };
  }
}
class Bad extends Base {
  // eslint-disable-next-line constructor-super, no-empty-function
  constructor() {}
}

new Good();
new AlsoGood();
// new Bad(); // ReferenceError

// Examples
// An object can be passed as the first argument to call
// or apply and this will be bound to it.
script = document.createElement("script");
script.innerHTML = `
  const obj = { a: "Custom" };

  // Variables declared with var become properties of the global object.
  var a = "Global";

  function whatsThis() {
    return this.a; // The value of 'this' is dependent on how the function is called
  }

  // 'Global' as this in the function isn't set, so it defaults to the global/window 
  // object in non–strict mode
  console.log('whatsThis(): ' + whatsThis());
  console.log('whatsThis.call(obj): ' + whatsThis.call(obj)); // 'Custom' as this in the function is set to obj
  console.log('whatsThis.apply(obj): ' + whatsThis.apply(obj)); // 'Custom' as this in the function is set to obj

// - 'this' and object conversion
function add(c, d) {
  return this.a + this.b + c + d;
}

const o = { a: 1, b: 3 };

// The first parameter is the object to use as
// 'this', subsequent parameters are passed as
// arguments in the function call
console.log('add.call(o, 5, 7): ' + add.call(o, 5, 7)); // 16

// The first parameter is the object to use as
// 'this', the second is an array whose
// members are used as the arguments in the function call
console.log('add.call(o, 10, 20): ' + add.apply(o, [10, 20])); // 34

// In non–strict mode, with call and apply, if the value passed as 'this' is not 
// an object, an attempt will be made to convert it to an object. Values null and 
// undefined become the global object. Primitives like 7 or 'foo' will be converted 
// to an Object using the related constructor, so the primitive number 7 is converted
// to an object as if by new Number(7) and the string 'foo' to an object as if by
// new String('foo')
function bar() {
  return Object.prototype.toString.call(this);
}

console.log('bar.call(7): ' + bar.call(7));     // [object Number]
console.log('bar.call("foo"): ' + bar.call('foo')); // [object String]
console.log('bar.call(undefined): ' + bar.call(undefined)); // [object global]
`;
document.head.appendChild(script);
