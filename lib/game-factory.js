'use strict';

const MapNode = require('./map-node');
const Game = require('./game');

class GameEngine {
  constructor(map) {
    this._mapConfig = map;
  }

  initializeMap() {
    const mapNodes = new Map();

    for (const node of this._mapConfig.nodes) {
      mapNodes.set(node.id, new MapNode(node));
    }

    for (const arrow of this._mapConfig.arrows) {
      const tailNode = mapNodes.get(arrow.tail);
      const headNode = mapNodes.get(arrow.head);

      tailNode.addEdge({ headNode, visited: false });
    }

    return mapNodes;
  }

  get map() {
    if (!this._map) {
      this._map = this.initializeMap();
    }

    return this._map;
  }

  createGame() {
    return new Game(this.map);
  }
}

module.exports = GameEngine;
