'use strict';

const topic = 'game.stop';

/** Class representing a command instructing the game to stop.
 */
class StopGameCommand {

  /**
   * Create an instance of StopGameCommand.
   */
  constructor(force) {
    this.topic = topic;
    this.data = { force };
  }

  static get topic() {
    return topic;
  }
}

module.exports = StopGameCommand;
