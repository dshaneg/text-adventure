'use strict';

const bus = require('../message-bus');

const CreateGameCommand = require('../commands/create-game-command');

class CreateGameHandler {
  constructor(gameSessionRepository) {
    this.gameSessionRepository = gameSessionRepository;
  }

  subscribe() {
    if (this.subscribed) {
      return;
    }

    bus.commandChannel.subscribe(CreateGameCommand.topic, () => this.handle());

    this.subscribed = true;
  }

  handle() {
    try {
      const sessionToken = this.gameSessionRepository.create();

      bus.eventChannel.publish({
        topic: 'game.created',
        data: { sessionToken }
      });
    } catch (error) {
      bus.eventChannel.publish({
        topic: 'error',
        data: error
      });
    }
  }
}

module.exports = CreateGameHandler;
