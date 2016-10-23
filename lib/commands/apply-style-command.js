'use strict';

const topic = 'style.apply';

/**
 * Class representing a command instructing the client to apply a new color palette.
 */
class ApplyStyleCommand {

  constructor(styleName) {
    this.topic = topic;
    this.data = {
      styleName
    };
  }

  static get topic() {
    return topic;
  }
}

module.exports = ApplyStyleCommand;
