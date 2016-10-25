'use strict';

const bus = require('../message-bus');

const MoveCommand = require('../commands/move-command');

class MoveHandler {
  constructor(gameSessionRepository) {
    this.gameSessionRepository = gameSessionRepository;
  }

  subscribe() {
    if (this.subscribed) {
      return;
    }

    bus.commandChannel.subscribe(MoveCommand.topic, data => this.handle(data));
    this.subscribed = true;
  }

  handle(data) {
    try {
      const game = this.gameSessionRepository.get(data.sessionToken);

      const currentNode = game.player.currentNode;
      const successor = currentNode.getSuccessor(data.direction);

      const directionName = getDirectionName(data.direction);

      if (successor) {
        game.player.currentNode = successor;

        bus.eventChannel.publish({
          topic: 'player.location.moved',
          data: { previousNode: currentNode, currentNode: successor, direction: directionName }
        });
      } else {
        bus.eventChannel.publish({
          topic: 'player.location.move-blocked',
          data: { currentNode, direction: directionName }
        });
      }
    } catch (error) {
      bus.eventChannel.publish({ topic: 'error', data: error });
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
