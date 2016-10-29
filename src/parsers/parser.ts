'use strict';

import {Command} from '../commands/command';
import postal = require('postal');

export type ParseResponse = { channel: IChannelDefinition<any>, topic: string,  command: Command };

export abstract class Parser {
  setNext(parser: Parser) {
    this.next = parser;
    return parser;
  }

  public next: Parser;

  parse(sessionToken: string, input: string): ParseResponse {
    const command = this.parseInput(sessionToken, input);
    if (!command && this.next) {
      return this.next.parse(sessionToken, input);
    }

    return command;
  }

  protected abstract parseInput(sessionToken: string, input: string): ParseResponse;
}

