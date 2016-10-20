'use strict';

const commandName = 'equip-item';

/** Class representing a command instructing the game equip an item on the player.
 */
class EquipItemCommand {

  /**
   * Create an instance of StartCommand.
   */
  constructor(item) {
    this.name = commandName;
    this.item = item;
  }

  static matches(command) {
    return command.name === commandName;
  }
}

module.exports = EquipItemCommand;
