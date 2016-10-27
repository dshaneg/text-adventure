'use strict';

import {Command} from '../commands/command';

export abstract class Parser {
  setNext(parser: Parser) {
    this.next = parser;
    return parser;
  }

  public next: Parser;

  parse(sessionToken: string, input: string): { channel: any, command: Command } {
    const command = this.parseInput(sessionToken, input);
    if (!command && this.next) {
      return this.next.parse(sessionToken, input);
    }

    return command;
  }

  abstract parseInput(sessionToken: string, input: string): { channel: any, command: Command };
}

module.exports = Parser;
