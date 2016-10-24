'use strict';

const GameState = require('./game-state');
const bus = require('./message-bus');

const CreateGameCommand = require('./commands/create-game-command');

class GameWrangler {
  subscribe() {
    if (this.subscribed) {
      return;
    }

    bus.commandChannel.subscribe(CreateGameCommand.topic, () => this.handle());

    this.subscribed = true;
  }

  handle() {
    // eventually this will track multiple games
    this.gameState = new GameState();

    bus.eventChannel.publish({
      topic: 'game.created',
      data: {}
    });
  }
}

module.exports = GameWrangler;
