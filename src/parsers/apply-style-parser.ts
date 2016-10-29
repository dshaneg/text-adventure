'use strict';

import {Parser} from './parser';
import {ApplyStyleCommand} from '../commands/apply-style-command';

import { clientCommandChannel as channel } from '../message-bus';

const verbSynonyms = ['apply', 'set'];
const nounSynonyms = ['style'];

export class ApplyStyleParser extends Parser {
  parseInput(sessionToken: string, inputText: string) {
    const words = inputText.match(/\b(\w+)\b/gi);

    if (words && (words.length === 3) && verbSynonyms.indexOf(words[0]) !== -1 && nounSynonyms.indexOf(words[1]) !== -1) {
      const styleName = words[2];

      return {
        channel,
        topic: ApplyStyleCommand.topic,
        command: new ApplyStyleCommand(sessionToken, styleName)
      };
    }

    return undefined;
  }
}
