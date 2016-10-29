'use strict';

import { Parser } from './parser';
import { MoveCommand } from '../commands/move-command';
import { commandChannel as channel } from '../message-bus';

const verbSynonyms = ['move', 'go', 'travel', 'walk', 'run', 'shamble', 'shuffle'];
const directionSynonyms = ['n', 's', 'e', 'w', 'u', 'd', 'north', 'south', 'east', 'west', 'up', 'down', 'dn'];

export class MoveParser extends Parser {
  protected parseInput(sessionToken: string, inputText: string) {
    const words = inputText.toLowerCase().match(/\b(\w+)\b/g);

    if (words && words.length >= 1 && directionSynonyms.indexOf(words[0]) !== -1) {
      return {
        channel,
        topic: MoveCommand.topic,
        command: new MoveCommand(sessionToken, words[0].charAt(0))
      };
    }

    if (words && words.length >= 2 && verbSynonyms.indexOf(words[0]) !== -1 &&
      directionSynonyms.indexOf(words[1]) !== -1) {
      return {
        channel,
        topic: MoveCommand.topic,
        command: new MoveCommand(sessionToken, words[1].charAt(0))
      };
    }

    return undefined;
  }
}
