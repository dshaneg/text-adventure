'use strict';

const channel = require('../message-bus').commandChannel;
const ListInventoryCommand = require('../commands/list-inventory-command');

const verbSynonyms = ['inventory', 'inv', 'i'];

class ListInventoryParser {
  static parse(inputText) {
    const words = inputText.toLowerCase().match(/\b(\w+)\b/g);

    if (words && words.length === 1 && verbSynonyms.indexOf(words[0]) !== -1) {
      return { channel, command: new ListInventoryCommand() };
    }

    return null;
  }
}

module.exports = ListInventoryParser;
