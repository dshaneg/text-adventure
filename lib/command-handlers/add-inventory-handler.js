'use strict';

const AddInventoryCommand = require('../commands/add-inventory-command');

class AddInventoryHandler {

  static canHandle(command) {
    return AddInventoryCommand.matches(command);
  }

  static handle(command, game) {
    if (!AddInventoryHandler.canHandle(command)) {
      throw new Error(`handler can't handle command ${command.command}`);
    }

    for (const delta of command.deltas) {
      game.inventory.add(delta.item, delta.count);
    }

    game.emit('inventory-added', command.deltas);
  }
}

module.exports = AddInventoryHandler;
