'use strict';

const GameState = require('./game-state');
const uuid = require('node-uuid');

class GameSessionRepository {
  constructor() {
    this.sessions = new Map();
  }

  create() {
    const token = uuid.v4();

    const gameState = new GameState();

    this.sessions.set(token, gameState);

    return token;
  }

  get(sessionToken) {
    return this.sessions.get(sessionToken);
  }
}

module.exports = GameSessionRepository;
