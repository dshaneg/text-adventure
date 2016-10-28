'use strict';

import { Parser } from './parser';
import { HelpCommand } from '../commands/help-command';
import { commandChannel as channel } from '../message-bus';

const verbSynonyms = ['help', 'h'];

export class HelpParser extends Parser {
  parseInput(sessionToken: string, inputText: string): { channel: any, command: HelpCommand } {
    const words = inputText.toLowerCase().match(/\b(\w+)\b/g);

    if (words && words.length === 1 && verbSynonyms.indexOf(words[0]) !== -1) {
      return { channel, command: new HelpCommand(sessionToken) };
    }

    return null;
  }
}
