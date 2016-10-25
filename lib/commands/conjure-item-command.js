'use strict';

const topic = 'item.conjure';

/**
 * Class representing a command instructing the game conjure an item from the nether.
 */
class ConjureItemCommand {

  constructor(sessionToken, itemId, count) {
    this.topic = topic;
    this.data = {
      sessionToken,
      itemId,
      count
    };
  }

  static get topic() {
    return topic;
  }
}

module.exports = ConjureItemCommand;
