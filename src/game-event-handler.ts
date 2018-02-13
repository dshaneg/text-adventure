'use strict';

import readline = require('readline');
import { Voice } from '@dshaneg/text-adventure-core';
import { EventHandler } from './event-handler';
import { KillSwitch } from './kill-switch';
import { style } from './style';

export class GameEventHandler implements EventHandler {
  constructor(
    private gameEngine: any,
    private rl: readline.ReadLine,
    private killSwitch: KillSwitch) {
  }

  handle(gameState: any, event: any) {
    switch (event.topic) {
      case 'player.location.moved':
      case 'client.style.applied': {
          this.setPrompt(gameState);
        break;
      }
      case 'game.stop-requested': {
        this.killSwitch.execute();
        break;
      }
    }

    if (event.message && event.voice !== Voice.mute) {
      const currentStyle = getStyle(event.voice);
      console.log(currentStyle(`\n${highlightHints(event.message)}`));
    }
  }

  private setPrompt(gameState: any) {
    const current = gameState.player.currentNode;
    this.rl.setPrompt(style.prompt(`\n${current.name} [${this.buildActionList(gameState)}] > `) + style.defaultOpen);
  }

  private buildActionList(gameState: any) {
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

function getStyle(voice: Voice) {
  if (!voice) {
    return style.normal;
  }

  switch (voice) {
    case Voice.bard:
      return style.normal;
    case Voice.gamemaster:
      return style.gamemaster;
    case Voice.warden:
      return style.error;
    case Voice.herald:
      return style.banner;
    default:
      return style.normal;
  }
}

function highlightHints(text: string) {
  return text.replace(/<<[a-z]+>>/g, match =>
    style.hint(match.substring(2, match.length - 2))
  );
}