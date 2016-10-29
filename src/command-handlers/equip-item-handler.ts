'use strict';

import { CommandHandler } from './command-handler';
import { commandChannel, eventChannel } from '../message-bus';
import { GameSessionRepository } from '../game-session-repository';

import { EquipItemCommand } from '../commands/equip-item-command';
import { ItemEquippedEvent } from '../events/item-equipped-event';

type commandDataType = { sessionToken: string, item: any };

export class EquipItemHandler extends CommandHandler {
  constructor(gameSessionRepository: GameSessionRepository) {
    super();
    this.gameSessionRepository = gameSessionRepository;
  }

  private gameSessionRepository: GameSessionRepository;

  subscribeToTopic() {
    commandChannel.subscribe(EquipItemCommand.topic, (command: EquipItemCommand) => this.handle(command));
  }

  handle(command: EquipItemCommand) {
    try {
      const game = this.gameSessionRepository.get(command.sessionToken);

      game.player.inventory.equip(command.item);

      eventChannel.publish(ItemEquippedEvent.topic, new ItemEquippedEvent(command.sessionToken, command.item));
    } catch (error) {
      eventChannel.publish('error', error);
    }
  }
}

