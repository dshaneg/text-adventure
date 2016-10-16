'use strict';

const verbSynonyms = ['move', 'go', 'travel', 'walk', 'run', 'shamble', 'shuffle'];
const directionSynonyms = ['n', 's', 'e', 'w', 'north', 'south', 'east', 'west'];

class MoveParser {
  static parse(inputText) {
    const words = inputText.toLowerCase().match(/\b(\w+)\b/g);

    if (words && words.length === 1 && directionSynonyms.indexOf(words[0]) !== -1) {
      return { command: 'move', direction: words[0].charAt(0) };
    }

    if (words && words.length >= 2 && verbSynonyms.indexOf(words[0]) !== -1 &&
      directionSynonyms.indexOf(words[1]) !== -1) {
      return { command: 'move', direction: words[1].charAt(0) };
    }

    return null;
  }
}

module.exports = MoveParser;
