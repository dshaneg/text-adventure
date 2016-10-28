'use strict';

import { CommandHandler } from './command-handler';
import { commandChannel, eventChannel } from '../message-bus';
import { StopGameCommand, StopGameData } from '../commands/stop-game-command';
import { GameSessionRepository } from '../game-session-repository';

export class StopGameHandler extends CommandHandler {
  constructor(gameSessionRepository: GameSessionRepository) {
    super();
    this.gameSessionRepository = gameSessionRepository;
  }

  private gameSessionRepository: GameSessionRepository;

  subscribeToTopic() {
    commandChannel.subscribe(StopGameCommand.topic, (data: StopGameData) => StopGameHandler.handle(data));
  }

  static handle(data: StopGameData) {
    if (data.force) {
      eventChannel.publish({ topic: 'game.stopped', data: { sessionToken: data.sessionToken } });
    } else {
      eventChannel.publish({ topic: 'game.stop-requested', data: { sessionToken: data.sessionToken } });
    }
  }
}

