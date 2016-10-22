'use strict';

const topic = 'player.location.teleport';

/**
 * Class representing a command to send a player to a node that is not necessarily adjacent to the current node.
 */
class TeleportCommand {

  /**
   * Create an instance of StartCommand.
   */
  constructor(targetNodeId) {
    this.topic = topic;
    this.data = {
      targetNodeId
    };
  }

  static get topic() {
    return topic;
  }
}

module.exports = TeleportCommand;
