// https://www.npmjs.com/package/jsdom-quokka-plugin
({ plugins: ["jsdom-quokka-plugin"] });

// - The bind() method
// ECMAScript 5 introduced Function.prototype.bind(). Calling f.bind(someObject)
// creates a new function with the same body and scope as f, but where 'this'
// occurs in the original function, in the new function it is permanently bound
// to the first argument of bind, regardless of how the function is being used.

let script = document.createElement("script");
script.innerHTML = `
  function f() {
    return this.a;
  }

  const g = f.bind({ a: 'azerty' });
  console.log('g(): ' + g()); // azerty

  const h = g.bind({ a: 'yoo' }); // bind only works once!
  console.log('h(): ' + h()); // azerty

  const o = { a: 37, f, g, h };
  console.log('o.a, o.f(), o.g(), o.h(): ' + o.a, o.f(), o.g(), o.h()); // 37,37, azerty, azerty
`;
document.head.appendChild(script);

// - Arrow functions
// In arrow functions, 'this' retains the value of the enclosing lexical context's this.
// In global code, it will be set to the global object:
script = document.createElement("script");
script.innerHTML = `
  const globalObject = this;
  const foo = (() => this);
  console.log('foo() === globalObject: ' + (foo() === globalObject)); // true

  // Call as a method of an object
  const obj = { func: foo };
  console.log(
    'obj.func() === globalObject: ' + (obj.func() === globalObject)
  ); // true

  // Note: If 'this arg' is passed to call, bind, or apply on invocation of an arrow
  // function it will be ignored. You can still prepend arguments to the call, but
  // the first argument (thisArg) should be set to null.
  
  const obj2 = {};

  // Attempt to set 'this' using call
  console.log(
    'foo.call(obj2) === globalObject: ' + (foo.call(obj2) === globalObject)
  ); // true

  // Attempt to set this using bind
  const boundFoo = foo.bind(obj2);
  console.log(
    'boundFoo() === globalObject: ' + (boundFoo() === globalObject)
  ); // true
`;
document.head.appendChild(script);

// No matter what, foo's 'this' is set to what it was when it was created
// (in the example above, the global object). The same applies to arrow functions
// created inside other functions: their 'this' remains that of the enclosing
// lexical context.
script = document.createElement("script");
script.innerHTML = `
// Create obj with a method bar that returns a function that
// returns its 'this'. The returned function is created as
// an arrow function, so its 'this' is permanently bound to the
// 'this' of its enclosing function. The value of bar can be set
// in the call, which in turn sets the value of the
// returned function.
// Note: the 'bar()' syntax is equivalent to 'bar: function ()'
// in this context
const obj3 = {
  bar() {
    const x = (() => this);
    return x;
  }
};

// Call bar as a method of obj3, setting its 'this' to obj3
// Assign a reference to the returned function to fn
const fn = obj3.bar();

// Call fn without setting 'this', would normally default
// to the global object or undefined in strict mode
console.log('fn() === obj3: ' + (fn() === obj3)); // true

// But caution if you reference the method of obj3 without calling it
const fn2 = obj3.bar;
// Calling the arrow function's 'this' from inside the bar method()
// will now return window, because it follows the 'this' from fn2.
console.log('fn2()() === window: ' + (fn2()() === window)); // true
`;
document.head.appendChild(script);

// In the above, the function (call it anonymous function A) assigned to obj3.bar
// returns another function (call it anonymous function B) that is created as an
// arrow function. As a result, function B's 'this' is permanently set to the 'this'
// of obj3.bar (function A) when called. When the returned function (function B)
// is called, its 'this' will always be what it was set to initially. In the above
// code example, function B's 'this' is set to function A's 'this' which is obj3,
// so it remains set to obj3 even when called in a manner that would normally
// set its 'this' to undefined or the global object (or any other method as in
// the previous example in the global execution context).
