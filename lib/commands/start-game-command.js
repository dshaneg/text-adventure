'use strict';

const topic = 'game.start';

/**
 * Class representing a command instructing the game to initialize and start.
 */
class StartGameCommand {
  constructor() {
    this.topic = topic;
    this.data = {};
  }

  static get topic() {
    return topic;
  }
}

module.exports = StartGameCommand;
