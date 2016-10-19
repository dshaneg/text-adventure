'use strict';

const StopGameCommand = require('../commands/stop-game-command');

class StopGameHandler {

  static canHandle(command) {
    return StopGameCommand.matches(command);
  }

  static handle(command, game) {
    if (!StopGameHandler.canHandle(command)) {
      throw new Error(`handler can't handle command ${command.command}`);
    }

    if (command.force) {
      // nothing to really do here yet except raise the event.
      // although, nothing is stopping the game from continuing even though we emitted the event.
      game.emit('game-stopped');
    } else {
      game.emit('stop-game-requested');
    }
  }
}

module.exports = StopGameHandler;
