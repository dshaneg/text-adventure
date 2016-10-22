'use strict';

const bus = require('../message-bus');
const AddInventoryCommand = require('../commands/add-inventory-command');

class AddInventoryHandler {
  subscribe() {
    if (this.subscribed) {
      return;
    }

    bus.commandChannel.subscribe(AddInventoryCommand.topic, data =>
      bus.eventChannel.publish({ topic: 'player.inventory.added', data })
    );

    this.subscribed = true;
  }
}

module.exports = AddInventoryHandler;
