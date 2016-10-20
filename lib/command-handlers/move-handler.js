'use strict';

const MoveCommand = require('../commands/move-command');

class MoveHandler {

  static canHandle(command) {
    return MoveCommand.matches(command);
  }

  /* eslint-disable no-param-reassign */

  static handle(command, game) {
    if (!MoveHandler.canHandle(command)) {
      throw new Error(`handler can't handle command ${command.command}`);
    }

    const initialNode = game.player.currentNode;

    const successor = game.player.currentNode.getSuccessor(command.direction);
    const direction = getDirectionName(command.direction);

    if (successor) {
      game.player.currentNode = successor;
      game.emit('player-moved', { direction, previousNode: initialNode, currentNode: game.player.currentNode });
    } else {
      game.emit('player-move-blocked', { direction, currentNode: game.player.currentNode });
    }
  }
}

/* eslint-enable no-param-reassign */

function getDirectionName(abbreviation) {
  switch (abbreviation) {
    case 'n':
      return 'north';
    case 's':
      return 'south';
    case 'e':
      return 'east';
    case 'w':
      return 'west';
    case 'u':
      return 'up';
    case 'd':
      return 'down';
    default:
      return 'unknown';
  }
}

module.exports = MoveHandler;
