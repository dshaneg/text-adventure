'use strict';

const topic = 'style.apply';

/**
 * Class representing a command instructing the client to apply a new color palette.
 */
class ApplyStyleCommand {

  constructor(sessionToken, styleName) {
    this.topic = topic;
    this.data = {
      sessionToken,
      styleName
    };
  }

  static get topic() {
    return topic;
  }
}

module.exports = ApplyStyleCommand;
