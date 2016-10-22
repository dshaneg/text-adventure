'use strict';

const bus = require('../message-bus');
const TeleportCommand = require('../commands/teleport-command');


class TeleportHandler {
  constructor(mapNodeRepository) {
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
    const targetNode = this.mapNodeRepository.get(data.targetNodeId);

    if (!targetNode) {
      bus.eventChannel.publish({
        topic: 'error',
        data: `Could not teleport. No node with id ${data.targetNodeId}.`
      });

      return;
    }

    const query = {
      topic: 'player.location',
      data: {},
      timeout: 2000
    };

    bus.queryChannel.request(query)
      .then(currentNode => TeleportHandler.teleport(currentNode, targetNode))
      .catch(error => bus.eventChannel.publish({ topic: 'error', data: error }));
  }

  static teleport(currentNode, targetNode) {
    bus.eventChannel.publish({
      topic: 'player.location.teleported',
      data: { previousNode: currentNode, currentNode: targetNode }
    });
  }
}

module.exports = TeleportHandler;
