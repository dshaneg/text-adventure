'use strict';

const EquipItemCommand = require('../commands/equip-item-command');

class EquipItemHandler {

  static canHandle(command) {
    return EquipItemCommand.matches(command);
  }

  static handle(command, game) {
    if (!EquipItemHandler.canHandle(command)) {
      throw new Error(`handler can't handle command ${command.command}`);
    }

    game.inventory.equip(command.item);
    game.emit('item-equipped', { item: command.item });
  }
}

module.exports = EquipItemHandler;
