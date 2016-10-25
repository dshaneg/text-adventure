'use strict';

const topic = 'player.inventory.equip-item';

/** Class representing a command instructing the game equip an item on the player.
 */
class EquipItemCommand {

  /**
   * Create an instance of StartCommand.
   */
  constructor(sessionToken, item) {
    this.topic = topic;
    this.data = {
      sessionToken,
      item
    };
  }

  static get topic() {
    return topic;
  }
}

module.exports = EquipItemCommand;
