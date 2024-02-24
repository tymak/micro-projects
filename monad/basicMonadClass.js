"use strict"
const assert = require("assert")

class MonadClass {
    constructor(initValue = 0, logs = []) {
        this.value = initValue
        this.logs = logs
    }
    static unit(x) {
        return new MonadClass(x)
    }
    flatMap(f) {
        const newMonad = f(this.value)
        const newValue = newMonad.value
        const newLogs = [...this.logs, ...newMonad.logs]
        return new MonadClass(newValue, newLogs)
    }

    resolve() {
        return {
            value: this.value,
            logs: this.logs
        }
    }
    printValue() {
        console.log(this.value)
        return this
    }
    printLogs() {
        console.log(this.logs)
        return this
    }
}

const foo = x => x + 1
const boo = x => x - 1

const applyfoo = value => new MonadClass(foo(value), ["apply foo"])
const applyboo = value => new MonadClass(boo(value), ["apply boo"])


// left identity check 
// unit(value).flatMap(f) ≡ f(value)
assert.deepStrictEqual(MonadClass.unit(0).flatMap(applyfoo).resolve(), applyfoo(0).resolve())

// right identity check
// monad.flatMap(unit) ≡ monad -> unit is neutral element of flatmap(no changes)
const unitFoo = x => x
const applyunitfoo = value => new MonadClass(unitFoo(value), [])
const applyunitfoo2 = value => MonadClass.unit(value)
const applyunitfoo3 = value => new MonadClass(value, [])
assert.deepStrictEqual(new MonadClass(0).flatMap(applyunitfoo).resolve(), new MonadClass(0).resolve())
assert.deepStrictEqual(new MonadClass(0).flatMap(applyunitfoo2).resolve(), new MonadClass(0).resolve())
assert.deepStrictEqual(new MonadClass(0).flatMap(applyunitfoo3).resolve(), new MonadClass(0).resolve())

// asociativity check
// monad.flatMap(f).flatMap(g) ≡ monad.flatMap(x => f(x).flatMap(g))
assert.deepStrictEqual(
    new MonadClass(0).flatMap(applyfoo).flatMap(applyboo).resolve(),
    new MonadClass(0).flatMap(x => applyfoo(x).flatMap(applyboo)).resolve()
)
