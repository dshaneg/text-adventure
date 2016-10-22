'use strict';

const bus = require('../message-bus');

const MoveCommand = require('../commands/move-command');

class MoveHandler {
  subscribe() {
    if (this.subscribed) {
      return;
    }

    bus.commandChannel.subscribe(MoveCommand.topic, data => MoveHandler.handle(data));
    this.subscribed = true;
  }

  static handle(command) {
    const query = {
      topic: 'player.location',
      data: {},
      timeout: 2000
    };

    bus.queryChannel.request(query)
      .then(currentNode =>
        MoveHandler.move(currentNode, command.direction)
      )
      .catch(error =>
        bus.eventChannel.publish({
          topic: 'error',
          data: error
        })
      );
  }

  static move(currentNode, direction) {
    const successor = currentNode.getSuccessor(direction);
    const directionName = getDirectionName(direction);

    if (successor) {
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
