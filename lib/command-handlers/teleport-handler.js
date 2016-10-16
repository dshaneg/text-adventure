'use strict';

class TeleportHandler {

  static canHandle(command) {
    return command.command === 'teleport';
  }

  static handle(command, game) {
    if (TeleportHandler.canHandle(command)) {
      game.teleport(command.targetId);
    }
  }
}

module.exports = TeleportHandler;
