'use strict';

const ConjureItemCommand = require('../commands/conjure-item-command');
const AddInventoryCommand = require('../commands/add-inventory-command');

class ConjureItemHandler {

  static canHandle(command) {
    return ConjureItemCommand.matches(command);
  }

  static handle(command, game) {
    if (!ConjureItemHandler.canHandle(command)) {
      throw new Error(`handler can't handle command ${command.command}`);
    }

    const item = game.itemRepository.get(command.itemId);
    const count = command.count || 1;

    if (!item) {
      game.emit('error', `no item with id ${command.itemId}`);
      return;
    }

    // in the future, I want to conjure items to a map location as well

    game.emit('item-conjured', { item, count, target: 'inventory' });

    game.acceptCommand(new AddInventoryCommand([{ item, count }]));
  }
}

module.exports = ConjureItemHandler;
