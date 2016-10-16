'use strict';

class StopHandler {

  static canHandle(command) {
    return command.command === 'request-stop' || command.command === 'stop';
  }

  static handle(command, game) {
    if (command.command === 'stop') {
      game.stop();
    } else {
      game.emit('stop-requested');
    }
  }
}

module.exports = StopHandler;
