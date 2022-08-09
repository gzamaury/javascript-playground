// babel: v7.18.2
// You can add logs by using console.log
console.log("We ♡ JavaScript!");

// or by using a comment line with equals sign at the end of an expression
const obj = {
  language: "javascript",
}; //=

function hello() {
  return "Hello World!";
}

// or a comment block with equals sign
hello(); /*= */

// or just type the variable name
obj;

// if the log represents an object you can use the dollar sign to access its properties
obj; //= $.language

// also inside the log comments you can print every expression in your scope
hello(); //= obj

// Besides, you can select one or more variables or expressions and press right click
// and select show value or explore the logs at the explorer on the left

// These usage information can be disabled in 'New commands'
// by checking JavaScript-repl: Usage Empty Content option in user's settings.

function f2() {
  "use strict"; // see strict mode
  return this;
}

f2() === undefined; // true
