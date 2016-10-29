'use strict';

import { CommandHandler } from './command-handler';
import { clientCommandChannel, clientEventChannel } from '../message-bus';
import { ApplyStyleCommand } from '../commands/apply-style-command';
import { style } from '../style';

export class ApplyStyleHandler extends CommandHandler {
  subscribeToTopic() {
    clientCommandChannel.subscribe(ApplyStyleCommand.topic, (command: ApplyStyleCommand) => this.handle(command));
  }

  handle(command: ApplyStyleCommand) {
    try {
      style.set(command.styleName);
      clientEventChannel.publish('style.applied', { styleName: command.styleName });
    } catch (error) {
      clientEventChannel.publish('error', `Could not find a style named '${command.styleName}'.`);
    }
  }
}

