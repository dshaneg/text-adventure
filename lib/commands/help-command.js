'use strict';

const commandName = 'help';

/**
 * Class representing a command instructing the provide help text.
 */
class HelpCommand {

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

module.exports = HelpCommand;
