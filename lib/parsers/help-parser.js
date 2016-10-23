'use strict';

const channel = require('../message-bus').commandChannel;
const HelpCommand = require('../commands/help-command');
const Parser = require('./parser');

const verbSynonyms = ['help', 'h'];

class HelpParser extends Parser {
  parseInput(inputText) {
    const words = inputText.toLowerCase().match(/\b(\w+)\b/g);

    if (words && words.length === 1 && verbSynonyms.indexOf(words[0]) !== -1) {
      return { channel, command: new HelpCommand() };
    }

    return null;
  }
}

module.exports = HelpParser;
