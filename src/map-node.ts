'use strict';

const directionValues = new Map([
  ['n', 0],
  ['s', 1],
  ['e', 2],
  ['w', 3],
  ['u', 4],
  ['d', 5]
]);

export type Edge = { direction: string, headNode: MapNode, tailNode: MapNode };
export type EdgeState = { direction: string, visited: number, traversed: boolean };
export type MapCoordinates = { x: number, y: number, z: number }

export class MapNode {
  constructor(nodeConfig: any) {
    this.id = nodeConfig.id;
    this.name = nodeConfig.name;
    this.description = nodeConfig.description.join('\n');
    this.location = nodeConfig.location;
    this.visited = 0;
    this.edges = [];
  }

  public id: number;
  public name: string;
  public description: string;
  public location: MapCoordinates;
  public visited: number;
  public edges: Array<Edge>;

  addEdge(edge: Edge) {
    this.edges.push(edge);
  }

  visit() {
    this.visited += 1;
  }

  getAvailableDirections() {
    const directions: Array<EdgeState> = [];

    for (const edge of this.edges) {
      const discoveredSet = new Set([this.id]);
      directions.push({ direction: edge.direction, visited: edge.headNode.visited, traversed: edge.headNode.checkTraversed(discoveredSet) });
    }

    return directions.sort(directionCompare);
  }

  private checkTraversed(discoveredSet: Set<number>) {
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

  getSuccessor(direction: string) {
    const edge = this.edges.find(item => item.direction === direction);

    return edge && edge.headNode;
  }
}

function directionCompare(a: EdgeState, b: EdgeState) {
  return directionValues.get(a.direction) - directionValues.get(b.direction);
}

