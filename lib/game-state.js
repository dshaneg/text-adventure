'use strict';

const MapNode = require('./map-node');
const Player = require('./player');

class GameState {
  constructor() {
    const currentNode = new MapNode({ id: -1, name: 'the real world', description: [''], location: { x: 0, y: 0, z: 0 } });

    this.player = new Player(currentNode);
  }

  start() {
    this.started = true;
  }
}

module.exports = GameState;
