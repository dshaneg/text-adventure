'use strict';

import { Parser } from './parser';
import { StopGameCommand } from '../commands/stop-game-command';
import { commandChannel as channel } from '../message-bus';

const verbSynonyms = ['quit', 'q', 'exit', 'bye', 'leave'];

export class ExitParser extends Parser {
  parseInput(sessionToken: string, inputText: string): { channel: any, command: StopGameCommand } {
    const words = inputText.toLowerCase().match(/\b(\w+)\b/g);

    if (words && words.length === 1 && verbSynonyms.indexOf(words[0]) !== -1) {
      return { channel, command: new StopGameCommand(sessionToken) };
    }

    return null;
  }
}
