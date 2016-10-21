'use strict';

const postal = require('postal');
const MoveCommand = require('../commands/move-command');

const eventChannel = postal.channel('events');

class MoveHandler {
  static canHandle(command) {
    return MoveCommand.matches(command);
  }

  static handle(command, game) {
    if (!MoveHandler.canHandle(command)) {
      throw new Error(`handler can't handle command ${command.command}`);
    }

    const successor = game.player.currentNode.getSuccessor(command.direction);
    const direction = getDirectionName(command.direction);

    if (successor) {
      eventChannel.publish({
        topic: 'player.location.moved',
        data: { direction, previousNode: game.player.currentNode, currentNode: successor }
      });
    } else {
      eventChannel.publish({
        topic: 'player.location.blocked',
        data: { direction, currentNode: game.player.currentNode }
      });
    }
  }
}

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
