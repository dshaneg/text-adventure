'use strict';

import { CommandHandler } from './command-handler';
import { clientCommandChannel, clientEventChannel } from '../message-bus';
import { ApplyStyleCommand } from '../commands/apply-style-command';
import { style } from '../style';

export class ApplyStyleHandler extends CommandHandler {
  subscribeToTopic() {
    bus.clientCommandChannel.subscribe(ApplyStyleCommand.topic, (data: any) => this.handle(data));
  }

  handle(data: { sessionToken: string, styleName: string }) {
    try {
      style.set(data.styleName);
      bus.clientEventChannel.publish({ topic: 'style.applied', data: { styleName: data.styleName } });
    } catch (error) {
      bus.clientEventChannel.publish({ topic: 'error', data: `Could not find a style named '${data.styleName}'.` });
    }
  }
}

