'use strict';

import { CommandHandler } from './command-handler';
import { commandChannel, eventChannel } from '../message-bus';
import { MoveCommand } from '../commands/move-command';
import { GameSessionRepository } from '../game-session-repository';

export class MoveHandler extends CommandHandler {
  constructor(gameSessionRepository: GameSessionRepository) {
    super();
    this.gameSessionRepository = gameSessionRepository;
  }

  private gameSessionRepository: GameSessionRepository;

  subscribeToTopic() {
    commandChannel.subscribe(MoveCommand.topic, (command: MoveCommand) => this.handle(command));
  }

  handle(command: MoveCommand) {
    try {
      const game = this.gameSessionRepository.get(command.sessionToken);

      const currentNode = game.player.currentNode;
      const successor = currentNode.getSuccessor(command.direction);

      const directionName = getDirectionName(command.direction);

      if (successor) {
        game.player.currentNode = successor;

        eventChannel.publish('player.location.moved', {
          previousNode: currentNode,
          currentNode: successor,
          direction: directionName
        });
      } else {
        eventChannel.publish('player.location.move-blocked', {
          currentNode,
          direction: directionName
        });
      }
    } catch (error) {
      eventChannel.publish('error', error );
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

