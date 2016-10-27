'use strict';

import { MapNode } from './map-node';
import { Player } from './player';

export class GameState {
  constructor() {
    const currentNode = new MapNode({ id: -1, name: 'the real world', description: [''], location: { x: 0, y: 0, z: 0 } });

    this.player = new Player(currentNode);
  }

  private started: boolean;

  public player: Player;

  start() {
    this.started = true;
  }
}

module.exports = GameState;
