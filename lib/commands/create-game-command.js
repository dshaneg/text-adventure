'use strict';

const topic = 'game.create';

/**
 * Class representing a command instructing the game wrangler to create a new game.
 */
class CreateGameCommand {
  constructor() {
    this.topic = topic;
    this.data = {};
  }

  static get topic() {
    return topic;
  }
}

module.exports = CreateGameCommand;
