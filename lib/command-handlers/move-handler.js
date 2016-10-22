'use strict';

const bus = require('../message-bus');

const MoveCommand = require('../commands/move-command');

class MoveHandler {
  constructor() {
    this.eventChannel = bus.channel('events');
    this.queryChannel = bus.channel('queries');

    this.commandChannel = bus.channel('commands');
  }

  subscribe() {
    this.commandChannel.subscribe(MoveCommand.topic, data => this.handle(data));
  }

  handle(command) {
    const query = {
      topic: 'player.location',
      data: {},
      timeout: 2000
    };

    this.queryChannel.request(query)
      .then(currentNode =>
        this.move(currentNode, command.direction)
      )
      .catch(error =>
        this.eventChannel.publish({
          topic: 'error',
          data: error
        })
      );
  }

  move(currentNode, direction) {
    const successor = currentNode.getSuccessor(direction);
    const directionName = getDirectionName(direction);

    if (successor) {
      this.eventChannel.publish({
        topic: 'player.location.moved',
        data: { previousNode: currentNode, currentNode: successor, direction: directionName }
      });
    } else {
      this.eventChannel.publish({
        topic: 'player.location.blocked',
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
