'use strict';

import { CommandHandler } from './command-handler';
import { commandChannel, eventChannel } from '../message-bus';
import { ConjureItemCommand } from '../commands/conjure-item-command';
import { AddInventoryCommand } from '../commands/add-inventory-command';
import { GameSessionRepository } from '../game-session-repository';
import { ItemRepository } from '../item-repository';

type commandDataType = { sessionToken: string, itemId: number, count: number };

export class ConjureItemHandler extends CommandHandler {
  constructor(gameSessionRepository: GameSessionRepository, itemRepository: ItemRepository) {
    super();
    this.gameSessionRepository = gameSessionRepository;
    this.itemRepository = itemRepository;
  }

  private gameSessionRepository: GameSessionRepository;
  private itemRepository: ItemRepository;

  subscribeToTopic() {
    commandChannel.subscribe(ConjureItemCommand.topic, (data: commandDataType) => this.handle(data));
  }

  handle(data: commandDataType) {
    try {
      const item = this.itemRepository.get(data.itemId);
      const count = data.count || 1;

      if (!item) {
        eventChannel.publish({ topic: 'error', data: `Could not conjure item ${data.itemId}. No such item exists.` });
        return;
      }

      // in the future, I want to conjure items to a map location as well
      eventChannel.publish({ topic: 'item.conjured', data: { item, count, target: 'inventory' } });

      commandChannel.publish(new AddInventoryCommand(data.sessionToken, [{ item, count }]));
    } catch (error) {
      eventChannel.publish({ topic: 'error', data: error });
    }
  }
}

