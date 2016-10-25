'use strict';

const topic = 'player.location.move';

/**
 * Class representing a command instructing the game conjure an item from the nether.
 */
class MoveCommand {

  /**
   * Creates an instance of ConjureItemCommand.
   *
   * @param {string} sessionToken - string identifying the current game session
   * @param {String} direction - n|s|e|w|u|d
   *
   * @memberOf ConjureItemCommand
   */
  constructor(sessionToken, direction) {
    this.topic = topic;
    this.data = {
      sessionToken,
      direction
    };
  }

  static get topic() {
    return topic;
  }
}

module.exports = MoveCommand;
