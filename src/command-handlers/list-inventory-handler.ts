'use strict';

import { CommandHandler } from './command-handler';
import { commandChannel, eventChannel } from '../message-bus';
import { GameSessionRepository } from '../game-session-repository';
import { ListInventoryCommand } from '../commands/list-inventory-command';

export class ListInventoryHandler extends CommandHandler {
  constructor(gameSessionRepository: GameSessionRepository) {
    super();
    this.gameSessionRepository = gameSessionRepository;
  }

  private gameSessionRepository: GameSessionRepository;

  subscribeToTopic() {
    commandChannel.subscribe(ListInventoryCommand.topic, (data: { sessionToken: string }) => this.handle(data));
  }

  handle(data: { sessionToken: string }) {
    try {
      const game = this.gameSessionRepository.get(data.sessionToken);

      const inventoryList = game.player.inventory.getAll();

      eventChannel.publish('player.inventory.list-requested', { items: inventoryList });
    } catch (error) {
      eventChannel.publish({ topic: 'error', data: error });
    }
  }
}

