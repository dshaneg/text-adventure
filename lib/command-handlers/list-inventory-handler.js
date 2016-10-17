'use strict';

class ListInventoryHandler {

  static canHandle(command) {
    return command.command === 'list-inventory';
  }

  static handle(command, game) {
    if (ListInventoryHandler.canHandle(command)) {
      game.listInventory();
    }
  }
}

module.exports = ListInventoryHandler;
