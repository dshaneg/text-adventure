'use strict';

const bus = require('../message-bus');
const TeleportCommand = require('../commands/teleport-command');

const verbSynonyms = ['teleport', 'port', 'portal'];

/**
 * Note: Developer Command a.k.a. cheat
 * Parses the input text and decides whether to return a teleport command.
 * The teleport keyword should be followed by the id of the node you want to teleport to.
 *
 * @class TeleportParser
 */
class TeleportParser {
  static parse(inputText) {
    const words = inputText.toLowerCase().match(/\b(\w+)\b/g);

    if (words && words.length === 2 && verbSynonyms.indexOf(words[0]) !== -1) {
      const nodeId = Number(words[1]);

      return { channel: bus.commandChannel, command: new TeleportCommand(nodeId) };
    }

    return null;
  }
}

module.exports = TeleportParser;
