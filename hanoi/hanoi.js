//created by tymak
"use srict"

const Stack = require("./stack")

/**
 * @typedef {0|1|2} StackPosition
 */

/**
 * @private
 * @param {StackPosition} b 
 * @param {StackPosition} e 
 * @returns 
 */
const _getComplementarySlot = (b, e) => {
  const options = [false, false, false]
  options[b] = true
  options[e] = true
  return options.indexOf(false)
}

/**
 * @private
 * @param {Number} n 
 * @param {StackPosition} b 
 * @param {StackPosition} e 
 * @param {Stack} stack
 */
const _foo = (n, b, e, stack) => {
  if (n === 1) {
    stack.move(b, e)
  } else {
    const c = _getComplementarySlot(b, e)
    _foo(n - 1, b, c, stack)
    stack.move(b, e)
    _foo(n - 1, c, e, stack)
  }
}

/**
 * 
 * @param {Number} n 
 * @param {StackPosition} b 
 * @param {StackPosition} e 
 * @return void
 */
const porepareStack = (n, b = 0, e = 2) => {
  const stack = new Stack(n)
  return () => _foo(n, b, e, stack)
}

const runStack = porepareStack(6)

runStack()
