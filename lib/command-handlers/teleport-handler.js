'use strict';

const bus = require('../message-bus');
const TeleportCommand = require('../commands/teleport-command');


class TeleportHandler {
  constructor(gameSessionRepository, mapNodeRepository) {
    this.gameSessionRepository = gameSessionRepository;
    this.mapNodeRepository = mapNodeRepository;
  }

  subscribe() {
    if (this.subscribed) {
      return;
    }

    bus.commandChannel.subscribe(TeleportCommand.topic, data => this.handle(data));
    this.subscribed = true;
  }

  handle(data) {
    try {
      const targetNode = this.mapNodeRepository.get(data.targetNodeId);

      if (!targetNode) {
        bus.eventChannel.publish({
          topic: 'error',
          data: `Could not teleport. No node with id ${data.targetNodeId}.`
        });

        return;
      }

      const game = this.gameSessionRepository.get(data.sessionToken);

      game.player.currentNode = targetNode;

      bus.eventChannel.publish({
        topic: 'player.location.teleported',
        data: { previousNode: game.player.currentNode, currentNode: targetNode }
      });
    } catch (error) {
      bus.eventChannel.publish({ topic: 'error', data: error });
    }
  }
}

module.exports = TeleportHandler;
