'use strict';

const postal = require('postal');
const TeleportCommand = require('../commands/teleport-command');

const eventChannel = postal.channel('events');

class TeleportHandler {

  static canHandle(command) {
    return TeleportCommand.matches(command);
  }

  static handle(command, game) {
    if (!TeleportHandler.canHandle(command)) {
      throw new Error(`handler can't handle command ${command.command}`);
    }

    const targetNode = game.nodeMapRepository.get(command.targetNodeId);

    if (!targetNode) {
      eventChannel.publish({
        topic: 'error',
        data: `Could not teleport. No node with id ${command.targetNodeId}.`
      });

      return;
    }

    eventChannel.publish({
      topic: 'player.location.teleported',
      data: { previousNode: game.player.currentNode, currentNode: targetNode }
    });
  }
}

module.exports = TeleportHandler;
