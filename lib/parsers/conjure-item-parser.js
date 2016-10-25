'use strict';

const channel = require('../message-bus').commandChannel;
const ConjureItemCommand = require('../commands/conjure-item-command');
const Parser = require('./parser');

const verbSynonyms = ['conjureitem', 'conjure-item', 'ci'];

/**
 * Note: Developer Command a.k.a. cheat
 * Parses the input text and decides whether to return a conjure item command.
 * The conjure keyword should be followed by the id of the item you want to conjure.
 *
 * @class ConjureItemParser
 */
class ConjureItemParser extends Parser {
  parseInput(sessionToken, inputText) {
    const words = inputText.toLowerCase().match(/\b(\w+)\b/g);

    if (words && (words.length === 2 || words.length === 3) && verbSynonyms.indexOf(words[0]) !== -1) {
      const itemId = Number(words[1]);
      let count = 1;
      if (words[2]) {
        count = Number(words[2]);
      }

      return { channel, command: new ConjureItemCommand(sessionToken, itemId, count) };
    }

    return null;
  }
}

module.exports = ConjureItemParser;
