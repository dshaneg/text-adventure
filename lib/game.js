'use strict';

const EventEmitter = require('events');
const MapNode = require('./map-node');
const Inventory = require('./inventory');

class Game extends EventEmitter {
  constructor(repositorySet, commandHandlers) {
    super();
    this._gameDefinition = repositorySet.gameDefinitionRepository.gameDefinition;
    this._nodeMapRepository = repositorySet.mapNodeRepository;
    this.itemRepository = repositorySet.itemRepository;
    this._commandHandlers = commandHandlers;

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

  start() {
    this.emit('game-started', { banner: this._gameDefinition.banner, text: this._gameDefinition.opening });

    // initialize starting inventory
    for (const startItem of this.itemRepository.startSet) {
      this.addInventory(startItem.item, startItem.count);
      if (startItem.equip) {
        this.equip(startItem.item);
      }
    }

    this.teleport(this._nodeMapRepository.entryNode.id);
  }

  stop() {
    // nothing to really do here yet except raise the event.
    // although, nothing is stopping the game from continuing even though we stopped.

    this.emit('game-stopped');
  }

  help() {
    this.emit('help-requested', { text: this._gameDefinition.help });
  }

  teleport(nodeId) {
    const targetNode = this._nodeMapRepository.get(nodeId);

    if (targetNode) {
      const previousNode = this.currentNode;
      this.currentNode = targetNode;
      this.emit('player-teleported', { previousNode, currentNode: this.currentNode });
    } else {
      this.emit('error', `Could not teleport. No node with id ${nodeId}.`);
    }
  }

  addInventory(item, count) {
    this.inventory.add(item, count);
    this.emit('inventory-added', { item, count });
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
    for (const handler of this._commandHandlers) {
      if (handler.canHandle(command)) {
        handler.handle(command, this);
        return;
      }
    }

    this.emit('error', `unrecognized command "${command.command}".`);
  }
}

module.exports = Game;
