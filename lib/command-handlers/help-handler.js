'use strict';

const bus = require('../message-bus');

const HelpCommand = require('../commands/help-command');

class HelpHandler {

  constructor(gameDefinitionRepository) {
    this.gameDefinitionRepository = gameDefinitionRepository;
  }

  subscribe() {
    if (this.subscribed) {
      return;
    }

    bus.commandChannel.subscribe(HelpCommand.topic, () =>
      bus.eventChannel.publish('help-requested', {
        text: this.gameDefinitionRepository.gameDefinition.help
      })
    );

    this.subscribed = true;
  }
}

module.exports = HelpHandler;
