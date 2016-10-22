'use strict';

const topic = 'player.location.move';

/**
 * Class representing a command instructing the game conjure an item from the nether.
 */
class MoveCommand {

  /**
   * Creates an instance of ConjureItemCommand.
   *
   * @param {String} direction - n|s|e|w|u|d
   *
   * @memberOf ConjureItemCommand
   */
  constructor(direction) {
    this.direction = direction;
  }

  static get topic() {
    return topic;
  }
}

module.exports = MoveCommand;
