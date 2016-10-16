'use strict';

const EventEmitter = require('events');
const MapNode = require('./map-node');

class Game extends EventEmitter {
  constructor(gameDefinition, nodeMap, commandHandlers) {
    super();
    this._gameDefinition = gameDefinition;
    this._nodeMap = nodeMap;
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

    // dummy node to start with
    this.currentNode = new MapNode({ id: -1, name: 'the real world', description: [''], location: this._gameDefinition.entryNode.location });

    this.teleport(this._gameDefinition.entryNode.id);
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
    const targetNode = this._nodeMap.get(nodeId);

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
