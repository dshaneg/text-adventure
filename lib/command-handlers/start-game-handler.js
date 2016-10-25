'use strict';

const bus = require('../message-bus');

const StartGameCommand = require('../commands/start-game-command');
const AddInventoryCommand = require('../commands/add-inventory-command');
const EquipItemCommand = require('../commands/equip-item-command');
const TeleportCommand = require('../commands/teleport-command');

class StartGameHandler {
  constructor(repositorySet) {
    this.itemRepository = repositorySet.itemRepository;
    this.gameDefinitionRepository = repositorySet.gameDefinitionRepository;
    this.mapNodeRepository = repositorySet.mapNodeRepository;
    this.gameSessionRepository = repositorySet.gameSessionRepository;
  }

  subscribe() {
    if (this.subscribed) {
      return;
    }

    bus.commandChannel.subscribe(StartGameCommand.topic, data => this.handle(data));

    this.subscribed = true;
  }

  handle(data) {
    try {
      const game = this.gameSessionRepository.get(data.sessionToken);

      game.start();

      // initialize starting inventory
      bus.commandChannel.publish(new AddInventoryCommand(data.sessionToken, this.itemRepository.startSet));

      for (const startItem of this.itemRepository.startSet) {
        if (startItem.equip) {
          bus.commandChannel.publish(new EquipItemCommand(data.sessionToken, startItem.item));
        }
      }

      // game.started is a trigger for other subscribers (notably text-engine) to add their subscriptions after initialization
      bus.eventChannel.publish({
        topic: 'game.started',
        sessionToken: data.sessionToken,
        data: {
          banner: this.gameDefinitionRepository.gameDefinition.banner,
          text: this.gameDefinitionRepository.gameDefinition.opening
        }
      });

      bus.commandChannel.publish(new TeleportCommand(data.sessionToken, this.mapNodeRepository.entryNode.id));
    } catch (error) {
      bus.eventChannel.publish({
        topic: 'error',
        sessionToken: data.sessionToken,
        data: error
      });
    }
  }
}

module.exports = StartGameHandler;
