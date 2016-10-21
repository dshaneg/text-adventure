'use strict';

const postal = require('postal');

class Player {
  constructor(inventory, currentNode) {
    this.inventory = inventory;
    this._currentNode = currentNode;
    const self = this;

    postal.subscribe({
      channel: 'events',
      topic: 'player.location.#',
      callback(data) {
        self._currentNode = data.currentNode;
        self._currentNode.visit();
      }
    });
  }

  get currentNode() {
    return this._currentNode;
  }
}

module.exports = Player;
