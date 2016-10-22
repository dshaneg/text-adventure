'use strict';

const topic = 'help';

/**
 * Class representing a command instructing the provide help text.
 */
class HelpCommand {
  /**
   * Create an instance of StartCommand.
   */
  constructor() {
    this.topic = topic;
    this.data = {};
  }

  static get topic() {
    return topic;
  }
}

module.exports = HelpCommand;
