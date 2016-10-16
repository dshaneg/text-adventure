'use strict';

const Game = require('./game');

// todo: this class got refactored away to almost nothing. does it still have value?
// hmm, yes, since we are decorating it

class GameEngine {
  constructor(repositorySet, commandHandlers) {
    this._repositorySet = repositorySet;
    this._handlers = commandHandlers;
  }

  createGame() {
    return new Game(this._repositorySet, this._handlers);
  }
}

module.exports = GameEngine;
