'use strict';

class HelpHandler {

  static canHandle(command) {
    return command.command === 'help';
  }

  static handle(command, game) {
    if (HelpHandler.canHandle(command)) {
      game.help();
    }
  }
}

module.exports = HelpHandler;
