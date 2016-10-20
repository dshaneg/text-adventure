'use strict';

class Player {
  constructor(inventory, currentNode) {
    this.inventory = inventory;
    this.currentNode = currentNode;
  }

  get currentNode() {
    return this._currentNode;
  }

  set currentNode(node) {
    this._currentNode = node;
    node.visit();
  }
}

module.exports = Player;
