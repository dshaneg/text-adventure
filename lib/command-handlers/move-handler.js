'use strict';

class MoveHandler {

  static canHandle(command) {
    return command.command === 'move';
  }

  /* eslint-disable no-param-reassign */

  static handle(command, game) {
    const initialNode = game.currentNode;

    const successor = game.currentNode.getSuccessor(command.direction);

    if (successor) {
      game.currentNode = successor;
      game.emit('player-moved', { previousNode: initialNode, currentNode: game.currentNode, direction: command.direction });
    } else {
      game.emit('player-move-blocked', { direction: command.direction, currentNode: game.currentNode });
    }
  }
}

/* eslint-enable no-param-reassign */

module.exports = MoveHandler;
