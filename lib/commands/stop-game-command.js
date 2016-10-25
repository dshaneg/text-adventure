'use strict';

const topic = 'game.stop';

/** Class representing a command instructing the game to stop.
 */
class StopGameCommand {

  /**
   * Create an instance of StopGameCommand.
   */
  constructor(sessionToken, force) {
    this.topic = topic;
    this.data = { sessionToken, force };
  }

  static get topic() {
    return topic;
  }
}

module.exports = StopGameCommand;
