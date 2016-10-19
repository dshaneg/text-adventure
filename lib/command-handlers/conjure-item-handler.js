'use strict';

const AddInventoryCommand = require('../commands/add-inventory-command');

class ConjureItemHandler {

  static canHandle(command) {
    return command.command === 'conjure-item';
  }

  static handle(command, game) {
    if (!ConjureItemHandler.canHandle(command)) {
      throw new Error(`handler can't handle command ${command.command}`);
    }

    const item = game.itemRepository.get(command.id);
    const count = command.count || 1;

    if (!item) {
      game.emit('error', `no item with id ${command.id}`);
      return;
    }

    // in the future, I want to conjure items to a map location as well

    game.emit('item-conjured', { item, count, target: 'inventory' });

    game.acceptCommand(new AddInventoryCommand([{ item, count }]));
  }
}

module.exports = ConjureItemHandler;
