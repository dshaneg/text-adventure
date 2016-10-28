'use strict';

import { commandChannel, eventChannel, clientCommandChannel, clientEventChannel, queryChannel } from './message-bus';

import { ItemFormatter } from './item-formatter';
import { style } from './style';

import { MapNode } from './map-node';

export class DebugEventLogger {
  static subscribe() {
    clientCommandChannel.subscribe('#', (data: any, envelope: any) => {
      log(`${envelope.channel}:${envelope.topic}`);
    });

    clientEventChannel.subscribe('#', (data: any, envelope: any) => {
      log(`${envelope.channel}:${envelope.topic}`);
    });

    commandChannel.subscribe('#', (data: any, envelope: any) => {
      log(`${envelope.channel}:${envelope.topic}`);
    });

    queryChannel.subscribe('#', (data: any, envelope: any) => {
      log(`${envelope.channel}:${envelope.topic}`);
    });

    eventChannel.subscribe('#', (data: any, envelope: any) => {
      switch (envelope.topic) {
        case 'game.created':
        case 'game.started':
        case 'game.help-requested':
        case 'game.stop-requested':
        case 'game.stopped':
          log(`${envelope.channel}:${envelope.topic}`);
          break;

        case 'player.location.moved':
          log(`${envelope.channel}:${envelope.topic} => ${data.direction} from ${formatNode(data.previousNode)} to ${formatNode(data.currentNode)}`);
          break;

        case 'player.location.teleported':
          log(`${envelope.channel}:${envelope.topic} => from ${formatNode(data.previousNode)} to ${formatNode(data.currentNode)}`);
          break;

        case 'player.location.move-blocked':
          log(`${envelope.channel}:${envelope.topic} => trying to move ${data.direction} from ${formatNode(data.currentNode)}`);
          break;

        case 'player.inventory.added':
          for (const listItem of data.deltas) {
            log(`${envelope.channel}:${envelope.topic} => ${ItemFormatter.formatDebugItem(listItem.item, listItem.count)}`);
          }
          break;

        case 'player.inventory.item-equipped':
          log(`${envelope.channel}:${envelope.topic} => ${data.item.name}(${data.item.id})`);
          break;

        case 'item.conjured':
          log(`${envelope.channel}:${envelope.topic} => ${ItemFormatter.formatDebugItem(data.item, data.count)} to ${data.target}`);
          break;

        case 'error':
          log(`${envelope.channel}:${envelope.topic} => ${data}`);
          break;

        case 'player.inventory.list-requested':
          log(`${envelope.channel}:${envelope.topic} => ${data.items.length} stacks in inventory`);
          break;

        default:
          log(`${envelope.channel}:${envelope.topic} => NOT SET UP FOR DEBUGGING`);
      }
    });
  }
}

function log(text: string) {
  console.log(style.debug(text));
}

function formatNode(node: MapNode) {
  return `${node.name}(${node.id})[${node.location.x},${node.location.y},${node.location.z}]`;
}

