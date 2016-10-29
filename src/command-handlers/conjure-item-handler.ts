'use strict';

import { CommandHandler } from './command-handler';
import { commandChannel, eventChannel } from '../message-bus';
import { ConjureItemCommand } from '../commands/conjure-item-command';
import { AddInventoryCommand } from '../commands/add-inventory-command';
import { GameSessionRepository } from '../game-session-repository';
import { ItemRepository } from '../item-repository';

export class ConjureItemHandler extends CommandHandler {
  constructor(gameSessionRepository: GameSessionRepository, itemRepository: ItemRepository) {
    super();
    this.gameSessionRepository = gameSessionRepository;
    this.itemRepository = itemRepository;
  }

  private gameSessionRepository: GameSessionRepository;
  private itemRepository: ItemRepository;

  subscribeToTopic() {
    commandChannel.subscribe(ConjureItemCommand.topic, (command: ConjureItemCommand) => this.handle(command));
  }

  handle(command: ConjureItemCommand) {
    try {
      const item = this.itemRepository.get(command.itemId);
      const count = command.count || 1;

      if (!item) {
        eventChannel.publish('error', `Could not conjure item ${command.itemId}. No such item exists.`);
        return;
      }

      // in the future, I want to conjure items to a map location as well
      eventChannel.publish('item.conjured', { item, count, target: 'inventory' });

      commandChannel.publish(AddInventoryCommand.topic, new AddInventoryCommand(command.sessionToken, [{ item, count }]));
    } catch (error) {
      eventChannel.publish('error', error);
    }
  }
}

