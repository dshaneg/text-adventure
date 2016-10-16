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
      console.log(chalk.gray(`event: ${playerMoved} ${event.direction}, from ${event.previousNode.name} to ${event.currentNode.name}`))
    );

    const playerMoveBlocked = 'player-move-blocked';
    game.on(playerMoveBlocked, event =>
      console.log(chalk.gray(`event: ${playerMoveBlocked} trying to move ${event.direction} from ${event.currentNode.name}`))
    );

    const gameStarted = 'game-started';
    game.on(gameStarted, () =>
      console.log(chalk.gray(`event: ${gameStarted}`))
    );

    return game;
  }
}

module.exports = DebuggingGameFactory;
