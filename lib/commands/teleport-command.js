'use strict';

const commandName = 'teleport';

/**
 * Class representing a command to send a player to a node that is not necessarily adjacent to the current node.
 */
class TeleportCommand {

  /**
   * Create an instance of StartCommand.
   */
  constructor(targetNodeId) {
    this.name = commandName;
    this.targetNodeId = targetNodeId;
  }

  static matches(command) {
    return command.name === commandName;
  }
}

module.exports = TeleportCommand;
