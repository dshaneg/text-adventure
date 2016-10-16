'use strict';

const chalk = require('chalk');

class DebuggingGameFactory {
  constructor(gameFactory) {
    this._gameFactory = gameFactory;
  }

  createGame() {
    const game = this._gameFactory.createGame();

    const playerMoved = 'player-moved';
    game.on(playerMoved, event =>
      console.log(chalk.gray(`event: ${playerMoved} ${event.direction} from ${formatNode(event.previousNode)} to ${formatNode(event.currentNode)}`))
    );

    const playerMoveBlocked = 'player-move-blocked';
    game.on(playerMoveBlocked, event =>
      console.log(chalk.gray(`event: ${playerMoveBlocked} trying to move ${event.direction} from ${formatNode(event.currentNode)}`))
    );

    const gameStarted = 'game-started';
    game.on(gameStarted, () =>
      console.log(chalk.gray(`event: ${gameStarted}`))
    );

    const stopRequested = 'stop-requested';
    game.on(stopRequested, () =>
      console.log(chalk.gray(`event: ${stopRequested}`))
    );

    const gameStopped = 'game-stopped';
    game.on(gameStopped, () =>
      console.log(chalk.gray(`event: ${gameStopped}`))
    );

    const helpRequested = 'help-requested';
    game.on(helpRequested, () =>
      console.log(chalk.gray(`event: ${helpRequested}`))
    );

    return game;
  }
}

function formatNode(node) {
  return `(${node.id}) ${node.name}[${node.location.x},${node.location.y}]`;
}

module.exports = DebuggingGameFactory;
