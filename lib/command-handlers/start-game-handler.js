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
  }

  subscribe() {
    if (this.subscribed) {
      return;
    }

    bus.commandChannel.subscribe(StartGameCommand.topic, () => this.handle());

    this.subscribed = true;
  }

  handle() {
    // initialize starting inventory
    bus.commandChannel.publish({ topic: AddInventoryCommand.topic, data: new AddInventoryCommand(this.itemRepository.startSet) });

    for (const startItem of this.itemRepository.startSet) {
      if (startItem.equip) {
        bus.commandChannel.publish({ topic: EquipItemCommand.topic, data: new EquipItemCommand(startItem.item) });
      }
    }

    // game.started is a trigger for other subscribers (notably text-engine) to add their subscriptions after initialization
    bus.eventChannel.publish({
      topic: 'game.started',
      data: {
        banner: this.gameDefinitionRepository.gameDefinition.banner,
        text: this.gameDefinitionRepository.gameDefinition.opening
      }
    });

    bus.commandChannel.publish({ topic: TeleportCommand.topic, data: new TeleportCommand(this.mapNodeRepository.entryNode.id) });
  }
}

module.exports = StartGameHandler;
