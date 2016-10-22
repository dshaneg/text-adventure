'use strict';

const postal = require('postal');

class Player {
  constructor(inventory, currentNode) {
    this.inventory = inventory;
    this.currentNode = currentNode;

    this.eventChannel = postal.channel('events');
    this.queryChannel = postal.channel('queries');

    this.subscribeEvents();

    this.subscribeQueries();
  }

  subscribeEvents() {
    const self = this;

    this.eventChannel.subscribe({
      topic: 'player.location.#',
      callback(data) {
        data.currentNode.visit();
        self.currentNode = data.currentNode;
      }
    });
  }

  subscribeQueries() {
    this.queryChannel.subscribe('player.location', (data, envelope) => {
      envelope.reply(null, this.currentNode);
    });
  }
}

module.exports = Player;
