'use strict';

const channel = require('../message-bus').clientCommandChannel;
const ListStylesCommand = require('../commands/list-styles-command');
const Parser = require('./parser');

const verbSynonyms = ['list', 'l'];
const nounSynonyms = ['styles', 'style'];


class ListStylesParser extends Parser {
  parseInput(sessionToken, inputText) {
    const words = inputText.toLowerCase().match(/\b(\w+)\b/g);

    if (!words) {
      return null;
    }

    // if they just typed in "styles"
    if (words.length === 1 && nounSynonyms.indexOf(words[0]) !== -1) {
      return this.buildCommand(sessionToken);
    }

    // if the player was more verbose and said "list styles"
    if (words.length === 2 && verbSynonyms.indexOf(words[0]) !== -1 && nounSynonyms.indexOf(words[1]) !== -1) {
      return this.buildCommand(sessionToken);
    }

    return null;
  }

  buildCommand(sessionToken) {
    return { channel, command: new ListStylesCommand(sessionToken) };
  }
}

module.exports = ListStylesParser;
