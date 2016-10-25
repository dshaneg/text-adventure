'use strict';

const topic = 'game.create';

/**
 * Class representing a command instructing the game wrangler to create a new game.
 */
class CreateGameCommand {
  constructor(sessionToken) {
    this.topic = topic;
    this.data = { sessionToken };
  }

  static get topic() {
    return topic;
  }
}

module.exports = CreateGameCommand;
