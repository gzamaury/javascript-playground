/* eslint-disable class-methods-use-this */
/* eslint-disable no-eval */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* eslint-disable prettier/prettier */
/* eslint-disable func-names */
// https://www.npmjs.com/package/jsdom-quokka-plugin
({ plugins: ["jsdom-quokka-plugin"] });

// - As an object method
// When a function is called as a method of an object, its 'this' is set to the
// object the method is called on.
// In the following example, when o.f() is invoked, inside the function 'this' is
// bound to the o object.
let script = document.createElement("script");
script.innerHTML = `
const o = {
  prop: 37,
  f() {
    return this.prop;
  }
};

console.log('o.f(): ' + o.f()); // 37
`;
document.head.appendChild(script);

// Note that this behavior is not at all affected by how or where the function
// was defined. In the previous example, we defined the function inline as the
// f member during the definition of o. However, we could have just as easily
// defined the function first and later attached it to o.f. Doing so results in
//  the same behavior:
script = document.createElement("script");
script.innerHTML = `
  const o2 = { prop: 37 };

  function independent() {
    return this.prop;
  }
  
  o2.f = independent;
  console.log('o2.f(): ' + o2.f()); // 37

  var prop = 73;
  console.log('independent(): ' + independent()); // 73

  // This demonstrates that it matters if the function was invoked from
  // the f member of o2 or globally

  // Similarly, the 'this' binding is only affected by the most immediate member
  // reference. In the following example, when we invoke the function, we call it
  // as a method g of the object o2.b. This time during execution, 'this' inside
  // the function will refer to o2.b. The fact that the object is itself a member
  // of o2 has no consequence; the most immediate reference is all that matters.

  o2.b = { g: independent, prop: 42 };
  console.log('o2.b.g(): ' + o2.b.g()); // 42
`;
document.head.appendChild(script);

// 'this' on the object's prototype chain
// The same notion holds true for methods defined somewhere on the object's
// prototype chain. If the method is on an object's prototype chain, 'this' refers
// to the object the method was called on, as if the method were on the object.
script = document.createElement("script");
script.innerHTML = `
  const o3 = {
    f() {
      return this.a + this.b;
    },
  };

  const p = Object.create(o3);
  p.a = 1;
  p.b = 4;

  console.log('p.f(): ' + p.f()); // 5
`;
document.head.appendChild(script);
// In this example, the object assigned to the variable p doesn't have its own
// f property, it inherits it from its prototype. But it doesn't matter that
// the lookup for f eventually finds a member with that name on o3; the lookup
// began as a reference to p.f, so 'this' inside the function takes the value of
// the object referred to as p. That is, since f is called as a method of p,
// its 'this' refers to p. This is an interesting feature of JavaScript's prototype
// inheritance.

// 'this' with a getter or setter
// Again, the same notion holds true when a function is invoked from a getter or
// a setter. A function used as getter or setter has its this bound to the object
// from which the property is being set or gotten.
script = document.createElement("script");
script.innerHTML = `
  function sum() {
    return this.a + this.b + this.c;
  }

  const o4 = {
    a: 1,
    b: 2,
    c: 3,
    get average() {
      return (this.a + this.b + this.c) / 3;
    }
  };

  Object.defineProperty(o4, 'sum', {
    get: sum,
    enumerable: true,
    configurable: true,
  });

  console.log('o4.average, o4.sum: ' + o4.average, o4.sum); // 2, 6
`;
document.head.appendChild(script);

// - As a constructor
// When a function is used as a constructor (with the new keyword), its 'this'
// is bound to the new object being constructed.
// Note: While the default for a constructor is to return the object referenced
// by 'this', it can instead return some other object (if the return value isn't
// an object, then the 'this' object is returned).
script = document.createElement("script");
script.innerHTML = `
  /*
  * Constructors work like this:
  *
  * function MyConstructor() {
  *   // Actual function body code goes here.
  *   // Create properties on 'this' as
  *   // desired by assigning to them.  E.g.,
  *   this.fum = "nom";
  *   // et cetera...
  *
  *   // If the function has a return statement that
  *   // returns an object, that object will be the
  *   // result of the 'new' expression.  Otherwise,
  *   // the result of the expression is the object
  *   // currently bound to 'this'
  *   // (i.e., the common case most usually seen).
  * }
  */

  function C() {
    this.a = 37;
  }

  let o5 = new C();
  console.log('o5.a: ' + o5.a); // 37

  function C2() {
    this.a = 73;
    return { a: 38 };
  }

  o5 = new C2();
  console.log('o5.a: ' + o5.a); // 38

  C2();
  console.log('window.a: ' + window.a); // 73

  function C3() {
    this.c3 = 54;
    console.log('this.c3: ' + this.c3);
    console.log('this.c4: ' + this.c4);
  }

  this.C4 = this.C3.bind({c4: 44})
  C4();  // 54, 44

  let o6 = new C4(); // 54, undefined

  console.log('o6.c3: ' + o6.c3); // 54
  console.log('o6.c4: ' + o6.c4); // undefined

  C3(); // 54, undefined
   console.log('window.c3: ' + window.c3); // 54
`;
document.head.appendChild(script);
// In the last example (C2), because an object was returned during construction,
// the new object that 'this' was bound to gets discarded. (This essentially
// makes the statement this.a = 37; dead code. It's not exactly dead because
// it gets executed, but it can be eliminated with no outside effects.)

// - As a DOM event handler
// When a function is used as an event handler, its 'this' is set to the element
// on which the listener is placed (some browsers do not follow this convention
// for listeners added dynamically with methods other than addEventListener()).
let button = document.createElement("button");
document.body.appendChild(button);
script = document.createElement("script");
script.innerHTML = `
  // When called as a listener, turns the related element blue
  function bluify(e) {
    console.log('tagName: ' + this.tagName);
    // Always true
    console.log('this === e.currentTarget: ' + (this === e.currentTarget));
    // true when currentTarget and target are the same object
    console.log('this === e.target : ' + (this === e.target));
    this.style.backgroundColor = '#A5D9F3';
  }

  // Get a list of every element in the document
  const elements = document.getElementsByTagName('*');

  // Add bluify as a click listener so when the
  // element is clicked on, it turns blue
  for (const element of elements) {
    element.addEventListener('click', bluify, false);
  }
`;
document.head.appendChild(script);
button.click();

// In an inline event handler
// When the code is called from an inline on-event handler, its 'this' is set to
// the DOM element on which the listener is placed:

button = document.createElement("button");
button.onclick = function () {
  console.log(`this.tagName: ${this.tagName.toLowerCase()}`);
};
document.body.appendChild(button);
button.click();

// The above console.log shows button. Note however that only the outer code has
// its 'this' set this way:
document.body.insertAdjacentHTML(
  "beforeend",
  `
  <button id="btn" onclick="
    console.log('this outer: ' + this);
    console.log('this inner: ' + 
      (function () { 
        return this; 
      })()
    );

    var mode = (eval('var __temp = null'), (typeof __temp === 'undefined')) ? 
      'strict' : 
      'non-strict';
    console.log('mode: ' + mode);

    console.log('this inner use strict: ' + 
      (function () { 
        'use strict'; 
        return this; 
      })()
    );
  ">
    Show inner this
  </button>`
);

button = document.getElementById("btn");
button.click();
// In this case, the inner function's 'this' isn't set so it returns the
// global/window object (i.e. the default object in non–strict mode where 'this'
// isn't set by the call).

// 'this' in classes
// Just like with regular functions, the value of 'this' within methods depends
// on how they are called. Sometimes it is useful to override this behavior so
// that 'this' within classes always refers to the class instance. To achieve
// this, bind the class methods in the constructor:
class Car {
  constructor() {
    // Bind sayBye but not sayHi to show the difference
    this.sayBye = this.sayBye.bind(this);
  }
  sayHi() {
    return `Hello from ${this.name}`;
  }
  sayBye() {
    return `Bye from ${this.name}`;
  }
  get name() {
    return "Ferrari";
  }
}

class Bird {
  get name() {
    return "Tweety";
  }
}

const car = new Car();
const bird = new Bird();

// The value of 'this' in methods depends on their caller
console.log(car.sayHi()); // Hello from Ferrari
bird.sayHi = car.sayHi;
console.log(bird.sayHi()); // Hello from Tweety

// For bound methods, 'this' doesn't depend on the caller
bird.sayBye = car.sayBye;
console.log(bird.sayBye()); // Bye from Ferrari
