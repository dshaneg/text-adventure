'use strict';

const HelpCommand = require('../commands/help-command');

const verbSynonyms = ['help', 'h'];

class HelpParser {
  static parse(inputText) {
    const words = inputText.toLowerCase().match(/\b(\w+)\b/g);

    if (words && words.length === 1 && verbSynonyms.indexOf(words[0]) !== -1) {
      return new HelpCommand();
    }

    return null;
  }
}

module.exports = HelpParser;
