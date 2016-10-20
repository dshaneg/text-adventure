'use strict';

const commandName = 'list-inventory';

/**
 * Class representing a command instructing the game to provide the contents of the player's inventory.
 */
class ListInventoryCommand {

  constructor() {
    this.name = commandName;
  }

  static matches(command) {
    return command.name === commandName;
  }
}

module.exports = ListInventoryCommand;
