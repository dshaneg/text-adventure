'use strict';

const bus = require('../message-bus');
const EquipItemCommand = require('../commands/equip-item-command');

class EquipItemHandler {
  subscribe() {
    if (this.subscribed) {
      return;
    }

    bus.commandChannel.subscribe(EquipItemCommand.topic, data =>
      bus.eventChannel.publish({ topic: 'player.inventory.item-equipped', data })
    );

    this.subscribed = true;
  }
}

module.exports = EquipItemHandler;
