'use strict';

class MoveHandler {

  static canHandle(command) {
    return command.command === 'move';
  }

  /* eslint-disable no-param-reassign */

  static handle(command, game) {
    const initialNode = game.currentNode;

    const successor = game.currentNode.getSuccessor(command.direction);
    const direction = getCompassDirection(command.direction);

    if (successor) {
      game.currentNode = successor;
      game.emit('player-moved', { direction, previousNode: initialNode, currentNode: game.currentNode });
    } else {
      game.emit('player-move-blocked', { direction, currentNode: game.currentNode });
    }
  }
}

/* eslint-enable no-param-reassign */

function getCompassDirection(abbreviation) {
  switch (abbreviation) {
    case 'n':
      return 'north';
    case 's':
      return 'south';
    case 'e':
      return 'east';
    case 'w':
      return 'west';
    default:
      return 'unknown';
  }
}

module.exports = MoveHandler;
