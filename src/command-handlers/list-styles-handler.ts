'use strict';

import { CommandHandler } from './command-handler';
import { clientCommandChannel, clientEventChannel } from '../message-bus';
import { style } from '../style';
import { ListStylesCommand } from '../commands/list-styles-command';

export class ListStylesHandler extends CommandHandler {

  subscribeToTopic() {
    clientCommandChannel.subscribe(ListStylesCommand.topic, (command: ListStylesCommand) => {
      const styleNames = style.definitionNames;
      clientEventChannel.publish('style.list-requested', {
        sessionToken: command.sessionToken,
        styleNames
      });
    });
  }
}

