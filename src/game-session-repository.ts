'use strict';

import { GameState } from './game-state';
import uuid = require('node-uuid');

export class GameSessionRepository {
  constructor() {
    this.sessions = new Map();
  }

  public sessions: Map<string, GameState>;

  create() {
    const token = uuid.v4();

    const gameState = new GameState();

    this.sessions.set(token, gameState);

    return token;
  }

  get(sessionToken: string): GameState {
    return this.sessions.get(sessionToken);
  }
}
