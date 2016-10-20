'use strict';

const TeleportCommand = require('../commands/teleport-command');

class TeleportHandler {

  static canHandle(command) {
    return TeleportCommand.matches(command);
  }

  /* eslint-disable no-param-reassign */

  static handle(command, game) {
    if (!TeleportHandler.canHandle(command)) {
      throw new Error(`handler can't handle command ${command.command}`);
    }

    const targetNode = game.nodeMapRepository.get(command.targetNodeId);

    if (!targetNode) {
      game.emit('error', `Could not teleport. No node with id ${command.targetNodeId}.`);
      return;
    }

    const previousNode = game.player.currentNode;
    game.player.currentNode = targetNode;

    game.emit('player-teleported', { previousNode, currentNode: game.player.currentNode });
  }
}

/* eslint-enable no-param-reassign */

module.exports = TeleportHandler;
