'use strict';

import { CommandHandler } from './command-handler';
import { commandChannel, eventChannel } from '../message-bus';
import { GameSessionRepository } from '../game-session-repository';
import { AddInventoryCommand } from '../commands/add-inventory-command';

export class AddInventoryHandler extends CommandHandler {
  constructor(gameSessionRepository: GameSessionRepository) {
    super();
    this.gameSessionRepository = gameSessionRepository;
  }

  private gameSessionRepository: GameSessionRepository;

  subscribeToTopic() {
    commandChannel.subscribe(AddInventoryCommand.topic, (data: any) => this.handle(data));
  }

  handle(data: { sessionToken: string, deltas: any }) {
    try {
      const game = this.gameSessionRepository.get(data.sessionToken);

      for (const delta of data.deltas) {
        game.player.inventory.add(delta.item, delta.count);
      }

      eventChannel.publish({ topic: 'player.inventory.added', data });
    } catch (error) {
      eventChannel.publish({ topic: 'error', data: error });
    }
  }
}

