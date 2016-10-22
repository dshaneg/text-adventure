'use strict';

const bus = require('../message-bus');

const ConjureItemCommand = require('../commands/conjure-item-command');
const AddInventoryCommand = require('../commands/add-inventory-command');

class ConjureItemHandler {
  constructor(itemRepository) {
    this.itemRepository = itemRepository;
  }

  subscribe() {
    if (this.subscribed) {
      return;
    }

    bus.commandChannel.subscribe(ConjureItemCommand.topic, data => this.handle(data));

    this.subscribed = true;
  }

  handle(data) {
    const item = this.itemRepository.get(data.itemId);
    const count = data.count || 1;

    if (!item) {
      bus.eventChannel.publish({ topic: 'error', data: `Could not conjure item ${data.itemId}. No such item exists.` });
      return;
    }

    // in the future, I want to conjure items to a map location as well
    bus.eventChannel.publish({ topic: 'item.conjured', data: { item, count, target: 'inventory' } });

    bus.commandChannel.publish({ topic: AddInventoryCommand.topic, data: new AddInventoryCommand([{ item, count }]) });
  }
}

module.exports = ConjureItemHandler;
