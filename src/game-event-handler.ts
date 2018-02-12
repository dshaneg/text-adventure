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
      case 'parser.failed':
      {
          this.handleGameResponse(event.message, style.gamemaster);
          break;
        }
      case 'player.inventory.added':
      case 'player.inventory.item-equipped':
        {
          this.handleGameResponse(event.message);
          break;
        }
      case 'client.style.applied':
        this._setPrompt(gameState);
        this.handleGameResponse(event.message, style.gamemaster);
      case 'error':
      {
        this.handleGameResponse(event.message, style.error);
        break;
      }
      case 'game.stop-requested':
      {
        this.rl.question(style.gamemaster('\nAre you sure you want to leave the game? [Y/n] '), (answer) => {
          if (answer.match(/^y$|^yes$|^$/i)) {
            this.killSwitch.execute();
          } else {
            this.rl.prompt();
          }
        });
        break;
      }
      case 'game.stopped': {
        console.log((style.gamemaster(`\n${event.message}`)));
        this.rl.close();
        break;
      }
      case 'item.conjured':
      {
        console.log(style.gamemaster('\n${response.message}'));
        break;
      }
      case 'game.started':
      {
        console.log(style.banner(event.banner));
        console.log();
        console.log(style.normal(event.message));

        this.started = true;
        break;
      }
      default:
      {
        this.handleGameResponse(`${event.topic} not handled.`, style.error);
      }
    }
  }

  handleGameResponse(responseText: string, textStyle?: any) {
    if (!this.started) {
      return;
    }

    const currentStyle = textStyle || style.normal;
    console.log(currentStyle(`\n${highlightHints(responseText)}`));

    this.rl.prompt();
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