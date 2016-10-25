'use strict';

const channel = require('../message-bus').commandChannel;
const MoveCommand = require('../commands/move-command');
const Parser = require('./parser');

const verbSynonyms = ['move', 'go', 'travel', 'walk', 'run', 'shamble', 'shuffle'];
const directionSynonyms = ['n', 's', 'e', 'w', 'u', 'd', 'north', 'south', 'east', 'west', 'up', 'down', 'dn'];

class MoveParser extends Parser {
  parseInput(sessionToken, inputText) {
    const words = inputText.toLowerCase().match(/\b(\w+)\b/g);

    if (words && words.length === 1 && directionSynonyms.indexOf(words[0]) !== -1) {
      return { channel, command: new MoveCommand(sessionToken, words[0].charAt(0)) };
    }

    if (words && words.length >= 2 && verbSynonyms.indexOf(words[0]) !== -1 &&
      directionSynonyms.indexOf(words[1]) !== -1) {
      return { channel, command: new MoveCommand(sessionToken, words[1].charAt(0)) };
    }

    return null;
  }
}

module.exports = MoveParser;
