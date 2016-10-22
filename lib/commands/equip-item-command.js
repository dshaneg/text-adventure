'use strict';

const topic = 'player.inventory.equip-item';

/** Class representing a command instructing the game equip an item on the player.
 */
class EquipItemCommand {

  /**
   * Create an instance of StartCommand.
   */
  constructor(item) {
    this.item = item;
  }

  static get topic() {
    return topic;
  }
}

module.exports = EquipItemCommand;
