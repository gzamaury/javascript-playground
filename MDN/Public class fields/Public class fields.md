# Public class fields

Both static and instance public fields are writable, enumerable, and configurable properties. As such, unlike their private counterparts, they participate in prototype inheritance.

## [](#syntax)Syntax

```js
class ClassWithInstanceField {
  instanceField = "instance field";
}

class ClassWithStaticField {
  static staticField = "static field";
}

class ClassWithPublicInstanceMethod {
  publicMethod() {
    return "hello world";
  }
}
```

## [](#examples)Examples

### [](#public_static_fields)Public static fields

Public static fields are useful when you want a field to exist only once per class, not on every class instance you create. This is useful for caches, fixed-configuration, or any other data you don't need to be replicated across instances.

Public static fields are declared using the `static` keyword. They are added to the class constructor at the time of class evaluation using [`Object.defineProperty()`](../global_objects/object/defineproperty). They are accessed again from the class constructor.

```js
class ClassWithStaticField {
  static staticField = "static field";
}

console.log(ClassWithStaticField.staticField);
// expected output: "static field"
```

Fields without initializers are initialized to `undefined`.

```js
class ClassWithStaticField {
  static staticField;
}

console.assert(ClassWithStaticField.hasOwnProperty("staticField"));
console.log(ClassWithStaticField.staticField);
// expected output: "undefined"
```

Public static fields are not reinitialized on subclasses, but can be accessed via the prototype chain.

```js
class ClassWithStaticField {
  static baseStaticField = "base field";
}

class SubClassWithStaticField extends ClassWithStaticField {
  static subStaticField = "sub class field";
}

console.log(SubClassWithStaticField.subStaticField);
// expected output: "sub class field"

console.log(SubClassWithStaticField.baseStaticField);
// expected output: "base field"
```

When initializing fields, `this` refers to the class constructor. You can also reference it by name, and use `super` to get the superclass constructor (if one exists).

```js
class ClassWithStaticField {
  static baseStaticField = "base static field";
  static anotherBaseStaticField = this.baseStaticField;

  static baseStaticMethod() {
    return "base static method output";
  }
}

class SubClassWithStaticField extends ClassWithStaticField {
  static subStaticField = super.baseStaticMethod();
}

console.log(ClassWithStaticField.anotherBaseStaticField);
// expected output: "base static field"

console.log(SubClassWithStaticField.subStaticField);
// expected output: "base static method output"
```

### [](#public_instance_fields)Public instance fields

Public instance fields exist on every created instance of a class. By declaring a public field, you can ensure the field is always present, and the class definition is more self-documenting.

Public instance fields are added with [`Object.defineProperty()`](../global_objects/object/defineproperty) either at construction time in the base class (before the constructor body runs), or just after `super()` returns in a subclass.

```js
class ClassWithInstanceField {
  instanceField = "instance field";
}

const instance = new ClassWithInstanceField();
console.log(instance.instanceField);
// expected output: "instance field"
```

Fields without initializers are initialized to `undefined`.

```js
class ClassWithInstanceField {
  instanceField;
}

const instance = new ClassWithInstanceField();
console.assert(instance.hasOwnProperty("instanceField"));
console.log(instance.instanceField);
// expected output: "undefined"
```

Like properties, field names may be computed.

```js
const PREFIX = "prefix";

class ClassWithComputedFieldName {
  [`${PREFIX}Field`] = "prefixed field";
}

const instance = new ClassWithComputedFieldName();
console.log(instance.prefixField);
// expected output: "prefixed field"
```

When initializing fields `this` refers to the class instance under construction. Just as in public instance methods, if you're in a subclass you can access the superclass prototype using `super`.

```js
class ClassWithInstanceField {
  baseInstanceField = "base field";
  anotherBaseInstanceField = this.baseInstanceField;
  baseInstanceMethod() {
    return "base method output";
  }
}

class SubClassWithInstanceField extends ClassWithInstanceField {
  subInstanceField = super.baseInstanceMethod();
}

const base = new ClassWithInstanceField();
const sub = new SubClassWithInstanceField();

console.log(base.anotherBaseInstanceField);
// expected output: "base field"

console.log(sub.subInstanceField);
// expected output: "base method output"
```

### [](#public_methods)Public methods

#### [](#public_static_methods)Public static methods

The `static` keyword defines a static method for a class. Static methods aren't called on instances of the class. Instead, they're called on the class itself. These are often utility functions, such as functions to create or clone objects.

```js
class ClassWithStaticMethod {
  static staticMethod() {
    return "static method has been called.";
  }
}

console.log(ClassWithStaticMethod.staticMethod());
// expected output: "static method has been called."
```

The static methods are added to the class constructor with [`Object.defineProperty()`](../global_objects/object/defineproperty) at class evaluation time. These methods are writable, non-enumerable, and configurable.

#### [](#public_instance_methods)Public instance methods

As the name implies, public instance methods are methods available on class instances.

```js
class ClassWithPublicInstanceMethod {
  publicMethod() {
    return "hello world";
  }
}

const instance = new ClassWithPublicInstanceMethod();
console.log(instance.publicMethod());
// expected output: "hello world"
```

Public instance methods are added to the class prototype at the time of class evaluation using [`Object.defineProperty()`](../global_objects/object/defineproperty). They are writable, non-enumerable, and configurable.

You may make use of generator, async, and async generator functions.

```js
class ClassWithFancyMethods {
  *generatorMethod() {}
  async asyncMethod() {}
  async *asyncGeneratorMethod() {}
}
```

Inside instance methods, `this` refers to the instance itself. In subclasses, `super` lets you access the superclass prototype, allowing you to call methods from the superclass.

```js
class BaseClass {
  msg = "hello world";
  basePublicMethod() {
    return this.msg;
  }
}

class SubClass extends BaseClass {
  subPublicMethod() {
    return super.basePublicMethod();
  }
}

const instance = new SubClass();
console.log(instance.subPublicMethod());
// expected output: "hello world"
```

Getters and setters are special methods that bind to a class property and are called when that property is accessed or set. Use the [get](../functions/get) and [set](../functions/set) syntax to declare a public instance getter or setter.

```js
class ClassWithGetSet {
  #msg = "hello world";
  get msg() {
    return this.#msg;
  }
  set msg(x) {
    this.#msg = `hello ${x}`;
  }
}

const instance = new ClassWithGetSet();
console.log(instance.msg);
// expected output: "hello world"

instance.msg = "cake";
console.log(instance.msg);
// expected output: "hello cake"
```

## [](#specifications)Specifications

| Specification                                                                                                                                                     |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [ECMAScript Language Specification # prod-FieldDefinition](https://tc39.es/ecma262/multipage/ecmascript-language-functions-and-classes.html#prod-FieldDefinition) |

## [](#browser_compatibility)Browser compatibility

|                       | Desktop | Mobile | Server  |                   |       |                                                                                                        |                 |                |                     |               |                                                                                                        |                  |      |         |
| --------------------- | ------- | ------ | ------- | ----------------- | ----- | ------------------------------------------------------------------------------------------------------ | --------------- | -------------- | ------------------- | ------------- | ------------------------------------------------------------------------------------------------------ | ---------------- | ---- | ------- |
|                       | Chrome  | Edge   | Firefox | Internet Explorer | Opera | Safari                                                                                                 | WebView Android | Chrome Android | Firefox for Android | Opera Android | Safari on IOS                                                                                          | Samsung Internet | Deno | Node.js |
| `Public_class_fields` | 72      | 79     | 69      | No                | 60    | 14.114-14.1Doesn't support public static fields. See WebKit bug [194095](https://webkit.org/b/194095). | 72              | 72             | 79                  | 51            | 14.514-14.5Doesn't support public static fields. See WebKit bug [194095](https://webkit.org/b/194095). | 11.0             | 1.0  | 12.0.0  |

## [](#see_also)See also

- [The Semantics of All JS Class Elements](https://rfrn.org/~shu/2018/05/02/the-semantics-of-all-js-class-elements.html)
- [Public and private class fields](https://v8.dev/features/class-fields) article at the v8.dev site

### Found a problem with this page?

- [Edit on **GitHub**](https://github.com/mdn/content/edit/main/files/en-us/web/javascript/reference/classes/public_class_fields/index.md)
- [Source on **GitHub**](https://github.com/mdn/content/blob/main/files/en-us/web/javascript/reference/classes/public_class_fields/index.md?plain=1)
- [Report a problem with this content on **GitHub**](https://github.com/mdn/content/issues/new?template=page-report.yml&mdn-url=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FJavaScript%2FReference%2FClasses%2FPublic_class_fields&metadata=%3C%21--+Do+not+make+changes+below+this+line+--%3E%0A%3Cdetails%3E%0A%3Csummary%3EPage+report+details%3C%2Fsummary%3E%0A%0A*+Folder%3A+%60en-us%2Fweb%2Fjavascript%2Freference%2Fclasses%2Fpublic_class_fields%60%0A*+MDN+URL%3A+https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FJavaScript%2FReference%2FClasses%2FPublic_class_fields%0A*+GitHub+URL%3A+https%3A%2F%2Fgithub.com%2Fmdn%2Fcontent%2Fblob%2Fmain%2Ffiles%2Fen-us%2Fweb%2Fjavascript%2Freference%2Fclasses%2Fpublic_class_fields%2Findex.md%0A*+Last+commit%3A+https%3A%2F%2Fgithub.com%2Fmdn%2Fcontent%2Fcommit%2F76a015ffc44bd29c93e725366ad023171e6c7e7d%0A*+Document+last+modified%3A+2022-03-27T18%3A17%3A05.000Z%0A%0A%3C%2Fdetails%3E)
- Want to fix the problem yourself? See [our Contribution guide](https://github.com/mdn/content/blob/main/README.md).

**Last modified:** Mar 27, 2022, [by MDN contributors](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Public_class_fields/contributors.txt)

© 2005–2022 MDN contributors.\
Licensed under the Creative Commons Attribution-ShareAlike License v2.5 or later.\
<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Public_class_fields>
