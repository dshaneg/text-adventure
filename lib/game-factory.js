'use strict';

const MapNode = require('./map-node');
const Game = require('./game');

class GameEngine {
  constructor(gameDefinition, mapDefinition, commandHandlers) {
    this._gameDefinitionRaw = gameDefinition;
    this._mapDefinitionRaw = mapDefinition;
    this.handlers = commandHandlers;
  }

  initializeMap() {
    const mapNodes = new Map();

    for (const node of this._mapDefinitionRaw.nodes) {
      mapNodes.set(node.id, new MapNode(node));
    }

    for (const arrow of this._mapDefinitionRaw.arrows) {
      const tailNode = mapNodes.get(arrow.tail);
      const headNode = mapNodes.get(arrow.head);

      tailNode.addEdge({ headNode, direction: arrow.direction });
    }

    return mapNodes;
  }

  initializeGameDefinition() {
    const def = {};

    def.welcome = this._gameDefinitionRaw.welcome.join('\n');

    return def;
  }

  get map() {
    if (!this._map) {
      this._map = this.initializeMap();
    }

    return this._map;
  }

  get gameDefinition() {
    if (!this._gameDefinition) {
      this._gameDefinition = this.initializeGameDefinition();
    }
    return this._gameDefinition;
  }

  createGame() {
    return new Game(this.gameDefinition, this.map, this.handlers);
  }
}

module.exports = GameEngine;
