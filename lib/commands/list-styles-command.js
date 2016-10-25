'use strict';

const topic = 'style.list';

/**
 * Class representing a command instructing the client to list the available color palettes.
 */
class ListStylesCommand {
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

module.exports = ListStylesCommand;
