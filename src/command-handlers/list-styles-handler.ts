'use strict';

import { CommandHandler } from './command-handler';
import { clientCommandChannel, clientEventChannel } from '../message-bus';
import { style } from '../style';
import { ListStylesCommand } from '../commands/list-styles-command';

export class ListStylesHandler extends CommandHandler {

  subscribeToTopic() {
    clientCommandChannel.subscribe(ListStylesCommand.topic, () => {
      const styleNames = style.definitionNames;
      clientEventChannel.publish({ topic: 'style.list-requested', data: { styleNames } });
    });
  }
}

