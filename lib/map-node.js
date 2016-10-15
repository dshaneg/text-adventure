'use strict';

class MapNode {
  constructor(nodeConfig) {
    this.id = nodeConfig.id;
    this.name = nodeConfig.name;
    this.description = nodeConfig.description.join('\n');
    this.location = nodeConfig.location;
    this.edges = [];
  }

  addEdge(edge) {
    this.edges.push(edge);
  }

  getSuccessor(direction) {
    let edge;

    switch (direction) {
      case 'n':
        edge = this.edges.find(item => item.headNode.location.x === this.location.x && item.headNode.location.y === this.location.y - 1);
        break;
      case 's':
        edge = this.edges.find(item => item.headNode.location.x === this.location.x && item.headNode.location.y === this.location.y + 1);
        break;
      case 'e':
        edge = this.edges.find(item => item.headNode.location.x === this.location.x + 1 && item.headNode.location.y === this.location.y);
        break;
      default:
        edge = this.edges.find(item => item.headNode.location.x === this.location.x - 1 && item.headNode.location.y === this.location.y);
    }

    return edge && edge.headNode;
  }
}

module.exports = MapNode;
