'use strict';

const verbSynonyms = ['inventory', 'inv', 'i'];

class ListInventoryParser {
  static parse(inputText) {
    const words = inputText.toLowerCase().match(/\b(\w+)\b/g);

    if (words && words.length === 1 && verbSynonyms.indexOf(words[0]) !== -1) {
      return { command: 'list-inventory' };
    }

    return null;
  }
}

module.exports = ListInventoryParser;
