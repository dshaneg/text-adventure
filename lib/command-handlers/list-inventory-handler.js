'use strict';

const ListInventoryCommand = require('../commands/list-inventory-command');

class ListInventoryHandler {

  static canHandle(command) {
    return ListInventoryCommand.matches(command);
  }

  static handle(command, game) {
    if (!ListInventoryHandler.canHandle(command)) {
      throw new Error(`handler can't handle command ${command.command}`);
    }

    game.emit('inventory-requested', { items: game.player.inventory.getAll(), equipped: game.player.inventory.getEquipped() });
  }
}

module.exports = ListInventoryHandler;
