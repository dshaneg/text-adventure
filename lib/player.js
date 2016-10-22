'use strict';

const postal = require('postal');

const eventChannel = postal.channel('events');

class Player {
  constructor(inventory, currentNode) {
    this.inventory = inventory;
    this._currentNode = currentNode;
    const self = this;

    eventChannel.subscribe({
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
