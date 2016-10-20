'use strict';

const commandName = 'move';

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
    this.name = commandName;
    this.direction = direction;
  }

  static matches(command) {
    return command.name === commandName;
  }
}

module.exports = MoveCommand;
