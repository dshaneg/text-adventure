'use strict';

import { CommandHandler } from './command-handler';
import { commandChannel, eventChannel } from '../message-bus';
import { EquipItemCommand } from '../commands/equip-item-command';
import { GameSessionRepository } from '../game-session-repository';

type commandDataType = { sessionToken: string, item: any };

export class EquipItemHandler extends CommandHandler {
  constructor(gameSessionRepository: GameSessionRepository) {
    super();
    this.gameSessionRepository = gameSessionRepository;
  }

  private gameSessionRepository: GameSessionRepository;

  subscribeToTopic() {
    commandChannel.subscribe(EquipItemCommand.topic, (data: commandDataType) => this.handle(data));
  }

  handle(data: commandDataType) {
    try {
      const game = this.gameSessionRepository.get(data.sessionToken);

      game.player.inventory.equip(data.item);

      eventChannel.publish({ topic: 'player.inventory.item-equipped', data });
    } catch (error) {
      eventChannel.publish({ topic: 'error', error });
    }
  }
}

