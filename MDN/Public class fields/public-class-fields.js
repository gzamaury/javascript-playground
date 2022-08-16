/* eslint-disable no-useless-constructor */
/* eslint-disable prefer-template */
/* eslint-disable no-eval */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* eslint-disable no-empty-function */
/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
// - Public static fields
// Public static fields are useful when you want a field to exist only once per
// class, not on every class instance you create. This is useful for caches,
// fixed-configuration, or any other data you don't need to be replicated across
// instances.

// Public static fields are declared using the static keyword. They are added to
// the class constructor at the time of class evaluation using Object.defineProperty().
// They are accessed again from the class constructor.
class ClassWithStaticField {
  static staticFieldUnd;
  static baseStaticField = "base static field";

  // When initializing fields, 'this' refers to the class constructor. You can
  // also reference it by name, and use super to get the superclass constructor
  // (if one exists).
  static anotherBaseStaticField = this.baseStaticField;
  static oneStaticField = ClassWithStaticField.baseStaticField;
  // static xField = super.staticField;

  static baseStaticMethod() {
    return "base static method output";
  }
}

console.log(Object.hasOwn(ClassWithStaticField, "staticFieldUnd"));
console.log(ClassWithStaticField.staticFieldUnd);
// expected output: "undefined"

console.log(ClassWithStaticField.anotherBaseStaticField);
// expected output: "base static field"

class SubClassWithStaticField extends ClassWithStaticField {
  static subStaticField = super.baseStaticMethod();
}

console.log(SubClassWithStaticField.baseStaticField);
// expected output: "base static field"

console.log(SubClassWithStaticField.subStaticField);
// expected output: "base static method output"

// - Public instance fields
// Public instance fields exist on every created instance of a class. By declaring
// a public field, you can ensure the field is always present, and the class
// definition is more self-documenting.

// Public instance fields are added with Object.defineProperty() either at
// construction time in the base class (before the constructor body runs), or
// just after super() returns in a subclass.
const PREFIX = "prefix";
class ClassWithInstanceField {
  instanceField = "instance field";
  instanceFieldUnd;

  // Like properties, field names may be computed.
  [`${PREFIX}Field`] = "prefixed field";

  // When initializing fields this refers to the class instance under construction.
  baseInstanceField = "base field";
  anotherBaseInstanceField = this.baseInstanceField;

  baseInstanceMethod() {
    return "base method output";
  }

  // Because instance fields of a class are added before the respective constructor
  // runs, you can access the fields' values within the constructor.
  constructor() {
    console.log(this.instanceField);
    // this.instanceField = "new value";
  }
}

const instance = new ClassWithInstanceField();
console.log(instance.instanceField);
// expected output: "instance field"

console.log(Object.hasOwn(instance, "instanceFieldUnd"));
console.log(instance.instanceFieldUnd);
// expected output: "undefined"

console.log(instance.prefixField);
// expected output: "prefixed field"

class SubClassWithInstanceField extends ClassWithInstanceField {
  // Just as in public instance methods, if you're in a subclass you can access
  // the superclass prototype using super.
  subInstanceField = super.baseInstanceMethod();
}
const sub = new SubClassWithInstanceField();

console.log(instance.anotherBaseInstanceField);
// expected output: "base field"

console.log(sub.subInstanceField);
// expected output: "base method output"

// However, because instance fields of a derived class are defined after
// super() returns, the base class's constructor does not have access to
// the derived class's fields.
class Base {
  constructor() {
    console.log("Base constructor:", this.field);
    // Base constructor: undefined
  }
}

class Derived extends Base {
  field = 1;
  constructor() {
    super();
    console.log("Derived constructor:", this.field);
    // Derived constructor: 1
  }
}

const derivedInstance = new Derived();

// Because class fields are added using the [[Define]] semantic (which is
// essentially Object.defineProperty()), field declarations in derived classes
// do not invoke setters in the base class. This behavior differs from using
// this.field = … in the constructor.
class Base2 {
  set field(val) {
    console.log(val);
    // 1, 9 why?????, see note below
  }
}

class DerivedWithField2 extends Base2 {
  field = 1;
}

const derWFInstance = new DerivedWithField2(); // No log, actually 1, but why????

class DerivedWithConstructor extends Base2 {
  constructor() {
    super();
    this.field = 9;
  }
}

const derWFInstance2 = new DerivedWithConstructor(); // Logs 9
// Note: Before the class fields specification was finalized with the [[Define]]
// semantic, most transpilers, including Babel and tsc, transformed class fields
// to the DerivedWithConstructor form, which has caused subtle bugs after class
// fields were standardized.

// - Public methods
// Public static methods
// The static keyword defines a static method for a class. Static methods aren't
// called on instances of the class. Instead, they're called on the class itself.
// These are often utility functions, such as functions to create or clone objects.
class ClassWithStaticMethod {
  static staticMethod() {
    return "static method has been called.";
  }
}

console.log(ClassWithStaticMethod.staticMethod());
// expected output: "static method has been called."
// The static methods are added to the class constructor with Object.defineProperty()
// at class evaluation time. These methods are writable, non-enumerable, and configurable.

// Public instance methods
// As the name implies, public instance methods are methods available on class instances.
class ClassWithPublicInstanceMethod {
  publicMethod() {
    return "hello world";
  }
}

const classWPinstanceMethod = new ClassWithPublicInstanceMethod();
console.log(classWPinstanceMethod.publicMethod());
// expected output: "hello world"
// Public instance methods are added to the class prototype at the time of class
// evaluation using Object.defineProperty(). They are writable, non-enumerable,
// and configurable.

// You may make use of generator, async, and async generator functions.
class ClassWithFancyMethods {
  *generatorMethod() {}
  async asyncMethod() {}
  async *asyncGeneratorMethod() {}
}

// Inside instance methods, 'this' refers to the instance itself. In subclasses,
// super lets you access the superclass prototype, allowing you to call methods
// from the superclass.
class BaseClass {
  msg = "hello world";
  basePublicMethod() {
    return this?.msg;
  }

  basePublicBoundMethod() {
    return this?.msg;
  }

  constructor() {
    this.basePublicBoundMethod = this.basePublicBoundMethod.bind(this);
  }
}

class SubClass extends BaseClass {
  subPublicMethod() {
    return super.basePublicMethod();
  }
  subPublicBoundMethod() {
    return super.basePublicMethod();
  }
  constructor() {
    super();
    this.subPublicBoundMethod = this.subPublicBoundMethod.bind(this);
  }
}

const subClassInstance = new SubClass();
console.log(subClassInstance.subPublicMethod());
// expected output: "hello world"

var mode = (eval("var __temp = null"), typeof __temp === "undefined")
  ? "strict"
  : "non-strict";
console.log("mode: " + mode);
// mode: strict

const globalMethod = new BaseClass().basePublicMethod;
console.log(globalMethod());
// expected output: "undefined"

const globalBoundMethod = new BaseClass().basePublicBoundMethod;
console.log(globalBoundMethod());
// expected output: "hello world"

const globalSubMethod = subClassInstance.subPublicMethod;
console.log(globalSubMethod());
// expected output: undefined

const globalSubBoundMethod = subClassInstance.subPublicBoundMethod;
console.log(globalSubBoundMethod());
// expected output: "hello world"

// Getters and setters are special methods that bind to a class property and are
// called when that property is accessed or set. Use the get and set syntax to
// declare a public instance getter or setter.
class ClassWithGetSet {
  #msg = "hello world";
  get msg() {
    return this.#msg;
  }
  set msg(x) {
    this.#msg = `hello ${x}`;
  }
}

const classWGSInstance = new ClassWithGetSet();
console.log(classWGSInstance.msg);
// expected output: "hello world"

classWGSInstance.msg = "cake";
console.log(classWGSInstance.msg);
// expected output: "hello cake"
