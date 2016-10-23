'use strict';

class Parser {
  setNext(parser) {
    this.next = parser;
    return parser;
  }

  parse(input) {
    const command = this.parseInput(input);
    if (!command && this.next) {
      return this.next.parse(input);
    }

    return command;
  }

  parseInput(input) {
    throw new Error(`parseInput is an abstract method. You must implement it in your parser. Input was "${input}".`);
  }
}

module.exports = Parser;
