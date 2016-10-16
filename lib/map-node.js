'use strict';

const directionValues = new Map([
  ['n', 0],
  ['s', 1],
  ['e', 2],
  ['w', 3],
  ['u', 4],
  ['d', 5]
]);

class MapNode {
  constructor(nodeConfig) {
    this.id = nodeConfig.id;
    this.name = nodeConfig.name;
    this.description = nodeConfig.description.join('\n');
    this.location = nodeConfig.location;
    this.visited = 0;
    this.edges = [];
  }

  addEdge(edge) {
    this.edges.push(edge);
  }

  visit() {
    this.visited += 1;
  }

  getAvailableDirections() {
    const directions = [];

    for (const edge of this.edges) {
      const discoveredSet = new Set([this.id]);
      directions.push({ direction: edge.direction, visited: edge.headNode.visited, traversed: edge.headNode.checkTraversed(discoveredSet) });
    }

    return directions.sort(directionCompare);
  }

  checkTraversed(discoveredSet) {
    // todo: see if everything past this node has been visited
    // be careful: this is not an acyclic graph
    if (!this.visited) {
      return false;
    }

    discoveredSet.add(this.id);

    for (const edge of this.edges) {
      if (!discoveredSet.has(edge.headNode.id) && !edge.headNode.checkTraversed(discoveredSet)) {
        return false;
      }
    }

    return true;
  }

  getSuccessor(direction) {
    const edge = this.edges.find(item => item.direction === direction);

    return edge && edge.headNode;
  }
}

function directionCompare(a, b) {
  return directionValues.get(a.direction) - directionValues.get(b.direction);
}

module.exports = MapNode;
