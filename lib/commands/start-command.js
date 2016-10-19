'use strict';

const commandName = 'start';

/** Class representing a command instructing the game to add a list of item deltas to inventory.
 * Item deltas consist of an item and a count.
 */
class StartCommand {

  /**
   * Create an instance of StartCommand.
   */
  constructor() {
    this.name = commandName;
  }

  static matches(command) {
    return command.name === commandName;
  }
}

module.exports = StartCommand;
