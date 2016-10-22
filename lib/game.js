'use strict';

const MapNode = require('./map-node');
const Inventory = require('./inventory');
const Player = require('./player');

class Game {
  constructor() {
    const inventory = new Inventory();
    const currentNode = new MapNode({ id: -1, name: 'the real world', description: [''], location: { x: 0, y: 0, z: 0 } });

    this.player = new Player(inventory, currentNode);
  }
}

module.exports = Game;
