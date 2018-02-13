'use strict';

import { EventHandler } from './event-handler';

import { style } from './style';

export class DebugEventLogger implements EventHandler {
  constructor(private eventHandler: EventHandler) {
  }

  handle(gameState: any, event: any): void {
    switch (event.topic) {
      case 'game.created':
      case 'game.starting':
      case 'game.started':
      case 'player.location.teleporting':
      case 'game.help-requested':
      case 'game.stop-requested':
      case 'game.stopped':
        log(event.topic);
        break;

      case 'player.location.moved':
        log(`${event.topic} => ${event.direction} from ${formatNode(event.previousNode)} to ${formatNode(event.currentNode)}`);
        break;

      case 'player.location.move-blocked':
        log(`${event.topic} => trying to move ${event.direction} from ${formatNode(event.currentNode)}`);
        break;

      case 'player.inventory.added':
        log(`${event.topic} => ${formatDebugItem(event.item, event.count)}`);
        break;

      case 'player.inventory.item-equipped':
        log(`${event.topic} => ${event.item.name}(${event.item.id})`);
        break;

      case 'item.conjured':
        log(`${event.topic} => ${formatDebugItem(event.item, event.count)} to ${event.target}`);
        break;

      case 'player.inventory.list-requested':
        log(`${event.topic} => ${event.items.length} stacks in inventory`);
        break;

      default:
        log(`${event.topic} => ${JSON.stringify(event)}`);
    }

    this.eventHandler.handle(gameState, event);
  }
}

function log(text: string) {
  console.log(style.debug(text));
}

function formatNode(node: any) {
  return `${node.name}(${node.id})[${node.location.x},${node.location.y},${node.location.z}]`;
}

function formatDebugItem(item: any, count: number) {
  const countText = count === 1 ? '' : ` x ${count}`;
  return `${item.name}(${item.id})${countText}`;
}