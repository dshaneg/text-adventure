'use strict';

class ConjureItemHandler {

  static canHandle(command) {
    return command.command === 'conjure-item';
  }

  static handle(command, game) {
    if (ConjureItemHandler.canHandle(command)) {
      const item = game.itemRepository.get(command.id);
      const count = command.count || 1;

      if (!item) {
        game.emit('error', `no item with id ${command.id}`);
      }

      game.emit('item-conjured', { item, count, target: 'inventory' });

      game.addInventory(item, count);
    }
  }
}

module.exports = ConjureItemHandler;
