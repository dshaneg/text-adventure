'use strict';

const commandName = 'item.conjure';

/**
 * Class representing a command instructing the game conjure an item from the nether.
 */
class ConjureItemCommand {

  constructor(itemId, count) {
    this.name = commandName;
    this.itemId = itemId;
    this.count = count;
  }

  static matches(command) {
    return command.name === commandName;
  }
}

module.exports = ConjureItemCommand;
