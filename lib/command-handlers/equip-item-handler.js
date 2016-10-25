'use strict';

const bus = require('../message-bus');
const EquipItemCommand = require('../commands/equip-item-command');

class EquipItemHandler {
  constructor(gameSessionRepository) {
    this.gameSessionRepository = gameSessionRepository;
  }

  subscribe() {
    if (this.subscribed) {
      return;
    }

    bus.commandChannel.subscribe(EquipItemCommand.topic, data => this.handle(data));

    this.subscribed = true;
  }

  handle(data) {
    try {
      const game = this.gameSessionRepository.get(data.sessionToken);

      game.player.inventory.equip(data.item);

      bus.eventChannel.publish({ topic: 'player.inventory.item-equipped', data });
    } catch (error) {
      bus.eventChannel.publish({ topic: 'error', error });
    }
  }
}

module.exports = EquipItemHandler;
