'use strict';

const EventEmitter = require('events');
const MapNode = require('./map-node');
const Inventory = require('./inventory');

class Game extends EventEmitter {
  constructor(repositorySet, commandHandlers) {
    super();
    this.gameDefinition = repositorySet.gameDefinitionRepository.gameDefinition;
    this.nodeMapRepository = repositorySet.mapNodeRepository;
    this.itemRepository = repositorySet.itemRepository;
    this.commandHandlers = commandHandlers;

    this.currentNode = new MapNode({ id: -1, name: 'the real world', description: [''], location: { x: 0, y: 0, z: 0 } });
    this.inventory = new Inventory();
  }

  get currentNode() {
    return this._currentNode;
  }

  set currentNode(node) {
    this._currentNode = node;
    node.visit();
  }

  help() {
    this.emit('help-requested', { text: this.gameDefinition.help });
  }

  teleport(nodeId) {
    const targetNode = this.nodeMapRepository.get(nodeId);

    if (targetNode) {
      const previousNode = this.currentNode;
      this.currentNode = targetNode;
      this.emit('player-teleported', { previousNode, currentNode: this.currentNode });
    } else {
      this.emit('error', `Could not teleport. No node with id ${nodeId}.`);
    }
  }

  removeInventory(item, count) {
    this.inventory.remove(item, count);
    this.emit('inventory-removed', { item, count });
  }

  equip(item) {
    this.inventory.equip(item);
    this.emit('item-equipped', { item });
  }

  unequip(item) {
    this.inventory.unequip(item);
    this.emit('item-unequipped', { item });
  }

  listInventory() {
    this.emit('inventory-requested', { items: this.inventory.getAll(), equipped: this.inventory.getEquipped() });
  }

  acceptCommand(command) {
    for (const handler of this.commandHandlers) {
      if (handler.canHandle(command)) {
        handler.handle(command, this);
        return;
      }
    }

    this.emit('error', `unrecognized command "${command.command}".`);
  }
}

module.exports = Game;
