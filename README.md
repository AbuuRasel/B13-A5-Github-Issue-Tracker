1. Difference between var, let, and const

var, let, and const are used to declare variables in JavaScript, but they behave differently.

var is the older way to declare variables. It is function-scoped and can be redeclared and updated.

let is block-scoped, which means it only works inside the block where it is defined. It can be updated but cannot be redeclared in the same scope.

const is also block-scoped but it cannot be reassigned after the value is set. It is usually used for variables that should not change.

Example:

var a = 10
let b = 20
const c = 30
2. What is the spread operator (...)?

The spread operator (...) is used to expand elements of an array or object into individual elements. It is often used to copy arrays or merge objects.

Example:

const numbers = [1, 2, 3]
const newNumbers = [...numbers, 4]

Here the spread operator copies the values of the first array into the new array.

3. Difference between map(), filter(), and forEach()

These three methods are used to work with arrays.

map() creates a new array by transforming each element of the original array.

filter() creates a new array with elements that pass a certain condition.

forEach() runs a function for each element in the array but does not return a new array.

Example:

const numbers = [1,2,3,4]

numbers.map(n => n * 2)
numbers.filter(n => n > 2)
numbers.forEach(n => console.log(n))
4. What is an arrow function?

An arrow function is a shorter way to write functions in JavaScript. It was introduced in ES6 and makes the code cleaner and easier to read.

Example:

const add = (a, b) => {
  return a + b
}

Short version:

const add = (a, b) => a + b
5. What are template literals?

Template literals are used to create strings in JavaScript using backticks (`). They allow you to insert variables inside a string using ${}.

Example:

const name = "Rasel"

const message = `Hello ${name}`

This makes it easier to combine text and variables.