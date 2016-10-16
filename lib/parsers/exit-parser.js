'use strict';

const verbSynonyms = ['quit', 'q', 'exit', 'bye', 'leave'];

class ExitParser {
  static parse(inputText) {
    const words = inputText.toLowerCase().match(/\b(\w+)\b/g);

    if (words && words.length === 1 && verbSynonyms.indexOf(words[0]) !== -1) {
      return { command: 'request-stop' };
    }

    return null;
  }
}

module.exports = ExitParser;
