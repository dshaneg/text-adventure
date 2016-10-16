'use strict';

const style = require('./style');

class DebuggingGameFactory {
  constructor(gameFactory) {
    this._gameFactory = gameFactory;
  }

  createGame() {
    const game = this._gameFactory.createGame();

    const playerMoved = 'player-moved';
    game.on(playerMoved, event =>
      console.log(style.debug(`event: ${playerMoved} ${event.direction} from ${formatNode(event.previousNode)} to ${formatNode(event.currentNode)}`))
    );

    const playerTeleported = 'player-teleported';
    game.on(playerTeleported, event =>
      console.log(style.debug(`event: ${playerTeleported} from ${formatNode(event.previousNode)} to ${formatNode(event.currentNode)}`))
    );

    const playerMoveBlocked = 'player-move-blocked';
    game.on(playerMoveBlocked, event =>
      console.log(style.debug(`event: ${playerMoveBlocked} trying to move ${event.direction} from ${formatNode(event.currentNode)}`))
    );

    const gameStarted = 'game-started';
    game.on(gameStarted, () =>
      console.log(style.debug(`event: ${gameStarted}`))
    );

    const stopRequested = 'stop-requested';
    game.on(stopRequested, () =>
      console.log(style.debug(`event: ${stopRequested}`))
    );

    const gameStopped = 'game-stopped';
    game.on(gameStopped, () =>
      console.log(style.debug(`event: ${gameStopped}`))
    );

    const helpRequested = 'help-requested';
    game.on(helpRequested, () =>
      console.log(style.debug(`event: ${helpRequested}`))
    );

    const error = 'error';
    game.on(error, event =>
      console.log(style.debug(`event: ${error}: ${event}`))
    );

    return game;
  }
}

function formatNode(node) {
  return `${node.name}(${node.id})[${node.location.x},${node.location.y},${node.location.z}]`;
}

module.exports = DebuggingGameFactory;
