'use strict';

const bus = require('../message-bus');

const ListInventoryCommand = require('../commands/list-inventory-command');

class ListInventoryHandler {
  constructor(gameSessionRepository) {
    this.gameSessionRepository = gameSessionRepository;
  }

  subscribe() {
    if (this.subscribed) {
      return;
    }

    bus.commandChannel.subscribe(ListInventoryCommand.topic, data => this.handle(data));

    this.subscribed = true;
  }

  handle(data) {
    try {
      const game = this.gameSessionRepository.get(data.sessionToken);

      const inventoryList = game.player.inventory.getAll();

      bus.eventChannel.publish('player.inventory.list-requested', { items: inventoryList });
    } catch (error) {
      bus.eventChannel.publish({ topic: 'error', data: error });
    }
  }
}

module.exports = ListInventoryHandler;
