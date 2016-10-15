'use strict';

class Game {
  constructor(nodeMap) {
    this._nodeMap = nodeMap;
    this.currentNode = nodeMap.get(0); // by convention, the 0 id will be assigned to the entry node;
  }

  // get currentNode() {
  //   return this._currentNode;
  // }

  // set currentNode(node) {
  //   this._currentNode = node;
  // }

  tryMove(direction) {
    const successor = this.currentNode.getSuccessor(direction);

    if (successor) {
      this.currentNode = successor;
      return true;
    }

    return false;
  }
}

module.exports = Game;
