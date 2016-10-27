'use strict';

import { Parser } from './parser';
import { ListStylesCommand } from '../commands/list-styles-command';
import { clientCommandChannel as channel } from '../message-bus';

const verbSynonyms = ['list', 'l'];
const nounSynonyms = ['styles', 'style'];

export class ListStylesParser extends Parser {
  parseInput(sessionToken: string, inputText: string): { channel: any, command: ListStylesCommand } {
    const words = inputText.toLowerCase().match(/\b(\w+)\b/g);

    if (!words) {
      return null;
    }

    // if they just typed in "styles"
    if (words.length === 1 && nounSynonyms.indexOf(words[0]) !== -1) {
      return this.buildCommand(sessionToken);
    }

    // if the player was more verbose and said "list styles"
    if (words.length === 2 && verbSynonyms.indexOf(words[0]) !== -1 && nounSynonyms.indexOf(words[1]) !== -1) {
      return this.buildCommand(sessionToken);
    }

    return null;
  }

  buildCommand(sessionToken: string) {
    return { channel, command: new ListStylesCommand(sessionToken) };
  }
}
