"use strict"

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

module.exports = MonadClass