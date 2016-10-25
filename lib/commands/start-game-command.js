'use strict';

const topic = 'game.start';

/**
 * Class representing a command instructing the game to initialize and start.
 */
class StartGameCommand {
  constructor(sessionToken) {
    this.topic = topic;
    this.data = { sessionToken };
  }

  static get topic() {
    return topic;
  }
}

module.exports = StartGameCommand;
