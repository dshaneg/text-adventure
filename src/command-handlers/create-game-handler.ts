'use strict';

import { CommandHandler } from './command-handler';
import { commandChannel, eventChannel } from '../message-bus';
import { CreateGameCommand } from '../commands/create-game-command';
import { GameSessionRepository } from '../game-session-repository';

export class CreateGameHandler extends CommandHandler {
  constructor(gameSessionRepository: GameSessionRepository) {
    super();
    this.gameSessionRepository = gameSessionRepository;
  }

  private gameSessionRepository: GameSessionRepository;

  subscribeToTopic() {
    commandChannel.subscribe(CreateGameCommand.topic, (command: CreateGameCommand) => this.handle(command));
  }

  handle(command: CreateGameCommand) {
    try {
      const sessionToken = this.gameSessionRepository.create();

      eventChannel.publish('game.created', { sessionToken });
    } catch (error) {
      eventChannel.publish('error', error);
    }
  }
}

