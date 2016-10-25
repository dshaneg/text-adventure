'use strict';

const topic = 'game.help';

/**
 * Class representing a command instructing the provide help text.
 */
class HelpCommand {
  /**
   * Create an instance of StartCommand.
   */
  constructor(sessionToken) {
    this.topic = topic;
    this.data = { sessionToken };
  }

  static get topic() {
    return topic;
  }
}

module.exports = HelpCommand;
