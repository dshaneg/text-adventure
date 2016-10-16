'use strict';

// lots of overloading of the term "map" in this class
// creating a map (dictionary) that contains nodes from the game layout map

const mapDefinition = require('../game/map');
const MapNode = require('./map-node');

class MapNodeRepository {

  get nodeMap() {
    if (!this._map) {
      this._map = createMap(mapDefinition);
    }

    return this._map;
  }

  get entryNode() {
    return this.get(mapDefinition.start);
  }

  get(nodeId) {
    return this.nodeMap.get(nodeId);
  }
}

function createMap(definition) {
  const map = new Map();

  for (const node of definition.nodes) {
    map.set(node.id, new MapNode(node));
  }

  for (const arrow of definition.arrows) {
    const tailNode = map.get(arrow.tail);
    const headNode = map.get(arrow.head);

    tailNode.addEdge({ headNode, direction: arrow.direction });
  }

  return map;
}

module.exports = MapNodeRepository;
