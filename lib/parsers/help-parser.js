'use strict';

const channel = require('../message-bus').commandChannel;
const HelpCommand = require('../commands/help-command');
const Parser = require('./parser');

const verbSynonyms = ['help', 'h'];

class HelpParser extends Parser {
  parseInput(sessionToken, inputText) {
    const words = inputText.toLowerCase().match(/\b(\w+)\b/g);

    if (words && words.length === 1 && verbSynonyms.indexOf(words[0]) !== -1) {
      return { channel, command: new HelpCommand(sessionToken) };
    }

    return null;
  }
}

module.exports = HelpParser;
