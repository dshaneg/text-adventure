'use strict';

import { CommandHandler } from './command-handler';
import { commandChannel, eventChannel } from '../message-bus';
import { MoveCommand } from '../commands/move-command';
import { GameSessionRepository } from '../game-session-repository';

type commandDataType = { sessionToken: string, direction: string };

export class MoveHandler extends CommandHandler {
  constructor(gameSessionRepository: GameSessionRepository) {
    super();
    this.gameSessionRepository = gameSessionRepository;
  }

  private gameSessionRepository: GameSessionRepository;

  subscribeToTopic() {
    commandChannel.subscribe(MoveCommand.topic, (data: commandDataType) => this.handle(data));
  }

  handle(data: commandDataType) {
    try {
      const game = this.gameSessionRepository.get(data.sessionToken);

      const currentNode = game.player.currentNode;
      const successor = currentNode.getSuccessor(data.direction);

      const directionName = getDirectionName(data.direction);

      if (successor) {
        game.player.currentNode = successor;

        eventChannel.publish({
          topic: 'player.location.moved',
          data: { previousNode: currentNode, currentNode: successor, direction: directionName }
        });
      } else {
        eventChannel.publish({
          topic: 'player.location.move-blocked',
          data: { currentNode, direction: directionName }
        });
      }
    } catch (error) {
      eventChannel.publish({ topic: 'error', data: error });
    }
  }
}

function getDirectionName(abbreviation: string) {
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

