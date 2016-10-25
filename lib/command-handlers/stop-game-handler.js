'use strict';

const bus = require('../message-bus');

const StopGameCommand = require('../commands/stop-game-command');

class StopGameHandler {
  constructor(gameSessionRepository) {
    this.gameSessionRepository = gameSessionRepository;
  }

  subscribe() {
    if (this.subscribed) {
      return;
    }

    bus.commandChannel.subscribe(StopGameCommand.topic, data => StopGameHandler.handle(data));

    this.subscribed = true;
  }

  static handle(data) {
    if (data.force) {
      bus.eventChannel.publish({ topic: 'game.stopped', data: { sessionToken: data.sessionToken } });
    } else {
      bus.eventChannel.publish({ topic: 'game.stop-requested', data: { sessionToken: data.sessionToken } });
    }
  }
}

module.exports = StopGameHandler;
