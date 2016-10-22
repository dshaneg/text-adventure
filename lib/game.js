'use strict';

const EventEmitter = require('events');
const MapNode = require('./map-node');
const Inventory = require('./inventory');
const Player = require('./player');

class Game extends EventEmitter {
  constructor(repositorySet, commandHandlers) {
    super();
    this.gameDefinition = repositorySet.gameDefinitionRepository.gameDefinition;
    this.nodeMapRepository = repositorySet.mapNodeRepository;
    this.itemRepository = repositorySet.itemRepository;
    this.commandHandlers = commandHandlers;

    const inventory = new Inventory();
    const currentNode = new MapNode({ id: -1, name: 'the real world', description: [''], location: { x: 0, y: 0, z: 0 } });

    this.player = new Player(inventory, currentNode);

    this.postalCommands = ['move'];
  }

  acceptCommand(command) {
    for (const handler of this.commandHandlers) {
      // skip postal-converted commands. REMOVED acceptCommand when all commands converted
      if (this.postalCommands.indexOf(command.name) !== -1) {
        return;
      }

      if (handler.canHandle(command)) {
        handler.handle(command, this);
        return;
      }
    }

    this.emit('error', `unrecognized command "${command.name}".`);
  }
}

module.exports = Game;
