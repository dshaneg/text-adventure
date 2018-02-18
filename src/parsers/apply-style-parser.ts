'use strict';

import { Parser } from '@dshaneg/text-adventure-core';
import { ApplyStyleCommand } from '../commands/apply-style-command';

const verbSynonyms = ['apply', 'set'];
const nounSynonyms = ['style'];

export class ApplyStyleParser extends Parser {
  parseInput(inputText: string): ApplyStyleCommand {
    const words = inputText.match(/\b(\w+)\b/gi);

    if (words && (words.length === 3) && verbSynonyms.indexOf(words[0]) !== -1 && nounSynonyms.indexOf(words[1]) !== -1) {
      const styleName = words[2];

      return new ApplyStyleCommand(styleName);
    }

    return null;
  }
}
