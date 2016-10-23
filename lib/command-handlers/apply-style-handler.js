'use strict';

const bus = require('../message-bus');

const style = require('../style');
const ApplyStyleCommand = require('../commands/apply-style-command');

class ApplyStyleHandler {

  subscribe() {
    if (this.subscribed) {
      return;
    }

    bus.clientCommandChannel.subscribe(ApplyStyleCommand.topic, data => ApplyStyleHandler.handle(data));

    this.subscribed = true;
  }

  static handle(data) {
    try {
      style.set(data.styleName);
      bus.clientEventChannel.publish({ topic: 'style.applied', data: { styleName: data.StyleName } });
    } catch (error) {
      bus.clientEventChannel.publish({ topic: 'error', data: `Could not find a style named '${data.styleName}'.` });
    }
  }
}

module.exports = ApplyStyleHandler;
