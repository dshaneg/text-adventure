'use strict';

import { CommandHandler } from './command-handler';
import { commandChannel, eventChannel } from '../message-bus';
import { HelpCommand } from '../commands/help-command';
import { GameDefinitionRepository } from '../game-definition-repository';

export class HelpHandler extends CommandHandler {

  constructor(gameDefinitionRepository: GameDefinitionRepository) {
    super();
    this.gameDefinitionRepository = gameDefinitionRepository;
  }

  private gameDefinitionRepository: GameDefinitionRepository;

  subscribeToTopic() {
    commandChannel.subscribe(HelpCommand.topic, (command: HelpCommand) =>
      eventChannel.publish('game.help-requested', {
        sessionToken: command.sessionToken,
        text: this.gameDefinitionRepository.gameDefinition.help
      })
    );
  }
}

