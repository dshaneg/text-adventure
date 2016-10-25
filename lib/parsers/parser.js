'use strict';

class Parser {
  setNext(parser) {
    this.next = parser;
    return parser;
  }

  parse(sessionToken, input) {
    const command = this.parseInput(sessionToken, input);
    if (!command && this.next) {
      return this.next.parse(sessionToken, input);
    }

    return command;
  }

  parseInput(sessionToken, input) {
    throw new Error(`parseInput is an abstract method. You must implement it in your parser. Input was "${input}".`);
  }
}

module.exports = Parser;
