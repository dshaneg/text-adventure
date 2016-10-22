'use strict';

const bus = require('./message-bus');

const Inventory = require('./inventory');

class Player {
  constructor(currentNode) {
    this.inventory = new Inventory();
    this.currentNode = currentNode;

    this.subscribeEvents();
    this.subscribeQueries();
  }

  subscribeEvents() {
    const self = this;

    bus.eventChannel.subscribe({
      topic: 'player.location.#',
      callback(data) {
        data.currentNode.visit();
        self.currentNode = data.currentNode;
      }
    });
  }

  subscribeQueries() {
    bus.queryChannel.subscribe('player.location', (data, envelope) => {
      envelope.reply(null, this.currentNode);
    });
  }
}

module.exports = Player;
