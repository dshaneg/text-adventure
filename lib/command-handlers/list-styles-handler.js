'use strict';

const bus = require('../message-bus');

const style = require('../style');
const ListStylesCommand = require('../commands/list-styles-command');

class ListStylesHandler {

  subscribe() {
    if (this.subscribed) {
      return;
    }

    bus.clientCommandChannel.subscribe(ListStylesCommand.topic, () => ListStylesHandler.handle());

    this.subscribed = true;
  }

  static handle() {
    const styleNames = style.definitionNames;
    bus.clientEventChannel.publish({ topic: 'style.list-requested', data: { styleNames } });
  }
}

module.exports = ListStylesHandler;
