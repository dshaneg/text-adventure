'use strict';

import {Command} from '../commands/command';

export abstract class Parser {
  setNext(parser: Parser) {
    this.next = parser;
    return parser;
  }

  public next: Parser;

  parse(input: string): Command {
    const command = this.parseInput(input);
    if (!command && this.next) {
      return this.next.parse(input);
    }

    return command;
  }

  abstract parseInput(input: string): Command;
}

