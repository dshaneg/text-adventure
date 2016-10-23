'use strict';

const channel = require('../message-bus').clientCommandChannel;

const ApplyStyleCommand = require('../commands/apply-style-command');

const verbSynonyms = ['apply', 'set'];
const nounSynonyms = ['style'];

class ApplyStyleParser {
  static parse(inputText) {
    const words = inputText.match(/\b(\w+)\b/gi);

    if (words && (words.length === 3) && verbSynonyms.indexOf(words[0]) !== -1 && nounSynonyms.indexOf(words[1] !== -1)) {
      const styleName = words[2];

      return { channel, command: new ApplyStyleCommand(styleName) };
    }

    return null;
  }
}

module.exports = ApplyStyleParser;
