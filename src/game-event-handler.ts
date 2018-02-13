'use strict';

import readline = require('readline');
import { EventHandler } from './event-handler';
import { KillSwitch } from './kill-switch';
import { style } from './style';

export class GameEventHandler implements EventHandler {
  constructor(
    private gameEngine: any,
    private rl: readline.ReadLine,
    private killSwitch: KillSwitch) {

    this.started = false;
  }

  private started: boolean;

  handle(gameState: any, event: any) {
    switch (event.topic) {
      case 'player.location.moved':
      case 'player.location.teleported': {
        this._setPrompt(gameState);
        this.handleGameResponse(event.currentNode.description);
        break;
      }
      case 'player.location.move-blocked':
      case 'player.inventory.list-requested':
      case 'game.help-requested':
      case 'client.style.list-requested':
      case 'item.conjured':
      case 'game.stopped':
      case 'parser.failed': {
        this.handleGameResponse(event.message, style.gamemaster);
        break;
      }
      case 'client.style.applied': {
        this._setPrompt(gameState);
        this.handleGameResponse(event.message, style.gamemaster);
        break;
      }
      case 'error': {
        this.handleGameResponse(event.message, style.error);
        break;
      }
      case 'game.stop-requested': {
        this.killSwitch.execute();
        break;
      }
      case 'game.started': {
        this.started = true;
        this.handleGameResponse(event.banner, style.banner);
        this.handleGameResponse(event.message);
        break;
      }
      default: {
        if (event.message) {
          this.handleGameResponse(event.message);
        } else {
          this.handleGameResponse(`${event.topic} not handled.`, style.error);
        }
      }
    }
  }

  handleGameResponse(responseText: string, textStyle?: any) {
    if (!this.started) {
      return;
    }

    const currentStyle = textStyle || style.normal;
    console.log(currentStyle(`\n${highlightHints(responseText)}`));
  }

  _setPrompt(gameState: any) {
    const current = gameState.player.currentNode;
    this.rl.setPrompt(style.prompt(`\n${current.name} [${this.buildActionList(gameState)}] > `) + style.defaultOpen);
  }

  buildActionList(gameState: any) {
    const directionStrings: string[] = [];

    const directions = this.gameEngine.getAvailableDirections(gameState);

    for (const direction of directions) {
      let color: any;
      if (direction.traversed) {
        color = style.traversed;
      } else if (direction.visited) {
        color = style.visited;
      } else {
        color = style.unvisited;
      }

      directionStrings.push(color(direction.direction));
    }

    return directionStrings.join(style.prompt(','));
  }
}

function highlightHints(text: string) {
  return text.replace(/<<[a-z]+>>/g, match =>
    style.hint(match.substring(2, match.length - 2))
  );
}