'use strict';

const verbSynonyms = ['teleport', 'port', 'portal'];

/**
 * Note: Developer Command a.k.a. cheat
 * Parses the input text and decides whether to return a teleport command.
 * The teleport keyword should be followed by the id of the node you want to teleport to.
 *
 * @class PortParser
 */
class TeleportParser {
  static parse(inputText) {
    const words = inputText.toLowerCase().match(/\b(\w+)\b/g);

    if (words && words.length === 2 && verbSynonyms.indexOf(words[0]) !== -1) {
      const nodeId = Number(words[1]);
      return { command: 'teleport', targetId: nodeId };
    }

    return null;
  }
}

module.exports = TeleportParser;
