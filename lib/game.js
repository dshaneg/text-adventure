'use strict';

const EventEmitter = require('events');

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
    this.emit('game-started', { text: this._gameDefinition.welcome });

    this.currentNode = this._gameDefinition.entryNode;
    this.emit('player-moved', { direction: 'into existence', previousNode: { id: -1, name: 'nowhere', location: { x: -1, y: -1 } }, currentNode: this.currentNode });
  }

  stop() {
    // nothing to really do here yet except raise the event.
    // although, nothing is stopping the game from continuing even though we stopped.

    this.emit('game-stopped');
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
