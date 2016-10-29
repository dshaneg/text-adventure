'use strict';

import { CommandHandler } from './command-handler';
import { commandChannel, eventChannel } from '../message-bus';
import { GameSessionRepository } from '../game-session-repository';
import { AddInventoryCommand } from '../commands/add-inventory-command';
import { InventoryAddedEvent } from '../events/inventory-added-event';

export class AddInventoryHandler extends CommandHandler {
  constructor(gameSessionRepository: GameSessionRepository) {
    super();
    this.gameSessionRepository = gameSessionRepository;
  }

  private gameSessionRepository: GameSessionRepository;

  subscribeToTopic() {
    commandChannel.subscribe(AddInventoryCommand.topic, (command: AddInventoryCommand) => this.handle(command));
  }

  handle(command: AddInventoryCommand) {
    try {
      const game = this.gameSessionRepository.get(command.sessionToken);

      for (const delta of command.deltas) {
        game.player.inventory.add(delta.item, delta.count);
      }

      eventChannel.publish(InventoryAddedEvent.topic, new InventoryAddedEvent(command.sessionToken, command.deltas));
    } catch (error) {
      eventChannel.publish('error', error);
    }
  }
}

