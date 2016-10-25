'use strict';

const Inventory = require('./inventory');

class Player {
  constructor(currentNode) {
    this.inventory = new Inventory();
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
