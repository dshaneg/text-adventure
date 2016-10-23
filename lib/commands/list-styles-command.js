'use strict';

const topic = 'style.list';

/**
 * Class representing a command instructing the client to list the available color palettes.
 */
class ListStylesCommand {
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

module.exports = ListStylesCommand;
