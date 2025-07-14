// dataStructures.js
// This file contains simple JavaScript implementations of Queue and Stack data structures.
// These will be used conceptually to manage pending and completed tasks.

/**
 * Implements a simple Queue data structure (FIFO - First-In, First-Out).
 * Uses a JavaScript array internally.
 */
class Queue {
    constructor() {
        this.elements = []; // The array to store queue elements
    }

    /**
     * Adds an element to the back of the queue (enqueue operation).
     * @param {*} element The element to add.
     */
    enqueue(element) {
        this.elements.push(element);
        console.log(`Enqueued: ${JSON.stringify(element.title || element)}`); // Log for demonstration
    }

    /**
     * Removes and returns the element from the front of the queue (dequeue operation).
     * Returns undefined if the queue is empty.
     * @returns {*} The element from the front of the queue.
     */
    dequeue() {
        if (this.isEmpty()) {
            console.log('Queue is empty. Cannot dequeue.');
            return undefined;
        }
        const dequeued = this.elements.shift(); // .shift() removes the first element
        console.log(`Dequeued: ${JSON.stringify(dequeued.title || dequeued)}`); // Log for demonstration
        return dequeued;
    }

    /**
     * Returns the element at the front of the queue without removing it (peek operation).
     * Returns undefined if the queue is empty.
     * @returns {*} The element at the front of the queue.
     */
    peek() {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.elements[0];
    }

    /**
     * Checks if the queue is empty.
     * @returns {boolean} True if the queue is empty, false otherwise.
     */
    isEmpty() {
        return this.elements.length === 0;
    }

    /**
     * Returns the number of elements in the queue.
     * @returns {number} The size of the queue.
     */
    size() {
        return this.elements.length;
    }

    /**
     * Returns all elements in the queue as an array.
     * @returns {Array} All elements in the queue.
     */
    getElements() {
        return [...this.elements]; // Return a copy to prevent direct modification
    }

    /**
     * Clears all elements from the queue.
     */
    clear() {
        this.elements = [];
        console.log('Queue cleared.');
    }
}

/**
 * Implements a simple Stack data structure (LIFO - Last-In, First-Out).
 * Uses a JavaScript array internally.
 */
class Stack {
    constructor() {
        this.elements = []; // The array to store stack elements
    }

    /**
     * Adds an element to the top of the stack (push operation).
     * @param {*} element The element to add.
     */
    push(element) {
        this.elements.push(element);
        console.log(`Pushed: ${JSON.stringify(element.title || element)}`); // Log for demonstration
    }

    /**
     * Removes and returns the element from the top of the stack (pop operation).
     * Returns undefined if the stack is empty.
     * @returns {*} The element from the top of the stack.
     */
    pop() {
        if (this.isEmpty()) {
            console.log('Stack is empty. Cannot pop.');
            return undefined;
        }
        const popped = this.elements.pop(); // .pop() removes the last element
        console.log(`Popped: ${JSON.stringify(popped.title || popped)}`); // Log for demonstration
        return popped;
    }

    /**
     * Returns the element at the top of the stack without removing it (peek operation).
     * Returns undefined if the stack is empty.
     * @returns {*} The element at the top of the stack.
     */
    peek() {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.elements[this.elements.length - 1];
    }

    /**
     * Checks if the stack is empty.
     * @returns {boolean} True if the stack is empty, false otherwise.
     */
    isEmpty() {
        return this.elements.length === 0;
    }

    /**
     * Returns the number of elements in the stack.
     * @returns {number} The size of the stack.
     */
    size() {
        return this.elements.length;
    }

    /**
     * Returns all elements in the stack as an array.
     * @returns {Array} All elements in the stack.
     */
    getElements() {
        return [...this.elements]; // Return a copy to prevent direct modification
    }

    /**
     * Clears all elements from the stack.
     */
    clear() {
        this.elements = [];
        console.log('Stack cleared.');
    }
}

// Export the Queue and Stack classes so they can be used in other files.
module.exports = { Queue, Stack };
