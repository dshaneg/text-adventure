'use strict';

const HelpCommand = require('../commands/help-command');

class HelpHandler {

  static canHandle(command) {
    return HelpCommand.matches(command);
  }

  static handle(command, game) {
    if (!HelpHandler.canHandle(command)) {
      throw new Error(`handler can't handle command ${command.command}`);
    }

    game.emit('help-requested', { text: game.gameDefinition.help });
  }
}

module.exports = HelpHandler;
