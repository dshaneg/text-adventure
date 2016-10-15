'use strict';

class TextEngine {
  constructor(gameFactory) {
    this._gameFactory = gameFactory;
  }

  respond(input) {
    if (this._game.tryMove('s')) {
      return { text: this._game.currentNode.description, locName: this._game.currentNode.name };
    }
    return { text: `bad input "${input}". can't go that way.`, locName: this._game.currentNode.name };
  }

  createGame() {
    this._game = this._gameFactory.createGame();


    return {
      locName: this._game.currentNode.name,
      text: this._game.currentNode.description
    };
  }
}

module.exports = TextEngine;
