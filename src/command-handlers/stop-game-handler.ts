'use strict';

import { CommandHandler } from './command-handler';
import { commandChannel, eventChannel } from '../message-bus';
import { StopGameCommand } from '../commands/stop-game-command';
import { GameSessionRepository } from '../game-session-repository';

export class StopGameHandler extends CommandHandler {
  constructor(gameSessionRepository: GameSessionRepository) {
    super();
    this.gameSessionRepository = gameSessionRepository;
  }

  private gameSessionRepository: GameSessionRepository;

  subscribeToTopic() {
    commandChannel.subscribe(StopGameCommand.topic, (command: StopGameCommand) => StopGameHandler.handle(command));
  }

  static handle(command: StopGameCommand) {
    if (command.force) {
      eventChannel.publish('game.stopped', { sessionToken: command.sessionToken });
    } else {
      eventChannel.publish('game.stop-requested', { sessionToken: command.sessionToken });
    }
  }
}

