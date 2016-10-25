'use strict';

const bus = require('../message-bus');
const AddInventoryCommand = require('../commands/add-inventory-command');

class AddInventoryHandler {
  constructor(gameSessionRepository) {
    this.gameSessionRepository = gameSessionRepository;
  }

  subscribe() {
    if (this.subscribed) {
      return;
    }

    bus.commandChannel.subscribe(AddInventoryCommand.topic, data => this.handle(data));

    this.subscribed = true;
  }

  handle(data) {
    try {
      const game = this.gameSessionRepository.get(data.sessionToken);

      for (const delta of data.deltas) {
        game.player.inventory.add(delta.item, delta.count);
      }

      bus.eventChannel.publish({ topic: 'player.inventory.added', data });
    } catch (error) {
      bus.eventChannel.publish({ topic: 'error', data: error });
    }
  }
}

module.exports = AddInventoryHandler;
