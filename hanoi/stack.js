//created by tymak
"use strict"

/**
 * @class
 */
class Stack {
    constructor(n) {
        this.stack = [
            [...Array(n).keys()].reverse(),
            [],
            []
        ]
        this.stepCounter = 0
        this.stackSize = n
    }
    /**
     * 
     * @param {0|1|2} B 
     * @param {0|1|2} E 
     */
    move(B, E) {
        const poppedItem = this.stack[B].pop()
        this.stack[E].push(poppedItem)
        this.stepCounter++
        console.log({ state: this.stack, step: this.stepCounter })
    }

    getStackSize() {
        return this.stackSize
    }
}

module.exports = Stack