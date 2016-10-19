'use strict';

const commandName = 'start-game';

/** Class representing a command instructing the game to initialize and start.
 */
class StartGameCommand {

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

module.exports = StartGameCommand;
