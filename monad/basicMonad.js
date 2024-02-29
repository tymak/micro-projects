'use strict';

/**
 * @typedef {Object} Result
 * @property {Number} value
 * @property {Array<string>} logs
 */

/**
 * A Monad structure.
 * @typedef {Object} Monad
 * @property {function(number): Monad} flatMap
 * @property {function(): Result} resolve
 * @property {function(): Monad} printValue
 * @property {function(): Monad} printLogs
 */

/**
 *
 * @param {Number} initValue
 * @param {Array<string>} logs
 * @returns {Monad}
 */

const Monad = (initValue = 0, logs = []) => ({
  value: initValue,
  logs: logs,

  /**
   *
   * @param {Function} f
   * @returns
   */
  flatMap: function (f) {
    const newMonad = f(this.value);
    const newValue = newMonad.value;
    const newLogs = [...this.logs, ...newMonad.logs];
    return Monad(newValue, newLogs);
  },
  resolve: function () {
    return {
      value: this.value,
      logs: this.logs,
    };
  },
  printValue: function () {
    console.log(this.value);
    return this;
  },
  printLogs: function () {
    console.log(this.logs);
    return this;
  },
});

/**
 * Unit function for creating a new Monad with an initial value and empty logs.
 * @function unit
 * @memberof Monad
 * @static
 * @param {Number} value - The initial value for the Monad.
 * @returns {Monad} - A new Monad instance.
 */
Monad.unit = (value) => Monad(value);

// const foo = x => x + 1
// const boo = x => x - 1

// const applyfoo = value => Monad(foo(value), ["apply foo"])
// const applyboo = value => Monad(boo(value), ["apply boo"])

// // left identity check
// // unit(value).flatMap(f) ≡ f(value)
// assert.deepStrictEqual(Monad.unit(0).flatMap(applyfoo).resolve(), applyfoo(0).resolve())

// // right identity check
// // monad.flatMap(unit) ≡ monad -> unit is neutral element of flatmap(no changes)
// const unitFoo = x => x
// const applyunitfoo = value => Monad(unitFoo(value), [])
// const applyunitfoo2 = value => Monad.unit(value)
// const applyunitfoo3 = value => Monad(value, [])
// assert.deepStrictEqual(Monad(0).flatMap(applyunitfoo).resolve(), Monad(0).resolve())
// assert.deepStrictEqual(Monad(0).flatMap(applyunitfoo2).resolve(), Monad(0).resolve())
// assert.deepStrictEqual(Monad(0).flatMap(applyunitfoo3).resolve(), Monad(0).resolve())

// // asociativity check
// // monad.flatMap(f).flatMap(g) ≡ monad.flatMap(x => f(x).flatMap(g))
// assert.deepStrictEqual(
//     Monad(0).flatMap(applyfoo).flatMap(applyboo).resolve(),
//     Monad(0).flatMap(x => applyfoo(x).flatMap(applyboo)).resolve()
//     )

module.exports = Monad;
