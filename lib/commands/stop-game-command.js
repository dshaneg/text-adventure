'use strict';

const commandName = 'stop-game';

/** Class representing a command instructing the game to stop.
 */
class StopGameCommand {

  /**
   * Create an instance of StartCommand.
   */
  constructor(force) {
    this.name = commandName;
    this.force = force;
  }

  static matches(command) {
    return command.name === commandName;
  }
}

module.exports = StopGameCommand;
