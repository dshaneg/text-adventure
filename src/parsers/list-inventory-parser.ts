'use strict';

import { Parser } from './parser';
import { ListInventoryCommand } from '../commands/list-inventory-command';
import { commandChannel as channel } from '../message-bus';

const verbSynonyms = ['inventory', 'inv', 'i'];

export class ListInventoryParser extends Parser {
  parseInput(sessionToken: string, inputText: string) {
    const words = inputText.toLowerCase().match(/\b(\w+)\b/g);

    if (words && words.length === 1 && verbSynonyms.indexOf(words[0]) !== -1) {
      return {
        channel,
        topic: ListInventoryCommand.topic,
        command: new ListInventoryCommand(sessionToken)
      };
    }

    return null;
  }
}
