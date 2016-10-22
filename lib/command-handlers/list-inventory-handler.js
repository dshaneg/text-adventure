'use strict';

const bus = require('../message-bus');

const ListInventoryCommand = require('../commands/list-inventory-command');

class ListInventoryHandler {

  subscribe() {
    if (this.subscribed) {
      return;
    }

    bus.commandChannel.subscribe(ListInventoryCommand.topic, data => ListInventoryHandler.handle(data));

    this.subscribed = true;
  }

  static handle(data) {
    const query = {
      topic: 'player.inventory',
      data,
      timeout: 2000
    };

    bus.queryChannel.request(query)
      .then(inv => bus.eventChannel.publish('player.inventory.list-requested', { items: inv }))
      .catch(error =>
        bus.eventChannel.publish({
          topic: 'error',
          data: error
        })
      );
  }
}

module.exports = ListInventoryHandler;
