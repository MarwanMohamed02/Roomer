"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Stack {
    top;
    arr;
    constructor({ top = -1, size = 10, arr = undefined }) {
        this.top = top;
        this.arr = arr ? arr : new Array(0);
    }
    push(element) {
        // if (this.top + 1 === this.size) {
        //     this.size *= 2;
        //     const newArr = new Array<T>(this.size)
        //     for (let i = 0; i <= this.top; i++) {
        //         newArr[i] = this.arr[i];
        //     }
        //     this.arr = newArr;
        // }
        // this.arr[++this.top] = element;
        this.arr.push(element);
        this.top++;
    }
    pop() {
        return this.arr[this.top--];
    }
    contains(element) {
        let found = false;
        for (let i = 0; i <= this.top; i++) {
            if (element === this.arr[i]) {
                found = true;
                break;
            }
        }
        return found;
    }
    remove(element) {
        if (this.contains(element)) {
            this.arr = this.arr.filter(e => e !== element);
            this.top--;
        }
    }
    isEmpty() { return this.top === -1; }
}
exports.default = Stack;
