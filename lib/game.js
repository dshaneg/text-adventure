'use strict';

const EventEmitter = require('events');
const MapNode = require('./map-node');
const Inventory = require('./inventory');

class Game extends EventEmitter {
  constructor(repositorySet, commandHandlers) {
    super();
    this._gameDefinition = repositorySet.gameDefinitionRepository.gameDefinition;
    this._nodeMapRepository = repositorySet.mapNodeRepository;
    this._itemRepository = repositorySet.itemRepository;
    this._commandHandlers = commandHandlers;
    this._inventory = new Inventory();
  }

  get currentNode() {
    return this._currentNode;
  }

  set currentNode(node) {
    this._currentNode = node;
    node.visit();
  }

  get inventory() {
    return this._inventory; // is there a point to this property rather just using a field? isn't the field public anyway? need to figure it out.
  }

  start() {
    this.emit('game-started', { banner: this._gameDefinition.banner, text: this._gameDefinition.opening });

    // initialize starting inventory
    for (const startItem of this._itemRepository.startSet) {
      this.addInventory(startItem.item, startItem.count);
      if (startItem.equip) {
        this.equip(startItem.item);
      }
    }

    const startNode = this._nodeMapRepository.entryNode;

    // dummy node as our "from" node
    this.currentNode = new MapNode({ id: -1, name: 'the real world', description: [''], location: startNode.location });

    this.teleport(startNode.id);
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
    this._inventory.add(item, count);
    this.emit('inventory-added', { item, count });
  }

  removeInventory(item, count) {
    this._inventory.remove(item, count);
    this.emit('inventory-removed', { item, count });
  }

  equip(item) {
    this._inventory.equip(item);
    this.emit('item-equipped', { item });
  }

  unequip(item) {
    this._inventory.unequip(item);
    this.emit('item-unequipped', { item });
  }

  listInventory() {
    this.emit('inventory-requested', { items: this._inventory.getAll(), equipped: this._inventory.getEquipped() });
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
