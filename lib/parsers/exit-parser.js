'use strict';

const channel = require('../message-bus').commandChannel;
const StopGameCommand = require('../commands/stop-game-command');
const Parser = require('./parser');

const verbSynonyms = ['quit', 'q', 'exit', 'bye', 'leave'];

class ExitParser extends Parser {
  parseInput(sessionToken, inputText) {
    const words = inputText.toLowerCase().match(/\b(\w+)\b/g);

    if (words && words.length === 1 && verbSynonyms.indexOf(words[0]) !== -1) {
      return { channel, command: new StopGameCommand(sessionToken) };
    }

    return null;
  }
}

module.exports = ExitParser;
