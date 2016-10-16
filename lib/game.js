'use strict';

const EventEmitter = require('events');
const MapNode = require('./map-node');

class Game extends EventEmitter {
  constructor(repositorySet, commandHandlers) {
    super();
    this._gameDefinition = repositorySet.gameDefinitionRepository.gameDefinition;
    this._nodeMapRepository = repositorySet.mapNodeRepository;
    this._itemRepository = repositorySet.itemRepository;
    this._commandHandlers = commandHandlers;
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
