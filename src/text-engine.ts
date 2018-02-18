'use strict';

import readline = require('readline');
import { style } from './style';
import { EventHandler } from './event-handler';
import { KillSwitch } from './kill-switch';
import { GameEngine, GameState } from '@dshaneg/text-adventure-core';
const nodeCleanup = require('node-cleanup');

// makes sure that wonky colors don't hang around after the program terminates
nodeCleanup(() => process.stdout.write(style.defaultClose));

const CLEAR_SCREEN_CODE = '\x1Bc';

export class TextEngine {
  constructor(
    private gameEngine: GameEngine, // why isn't ts cooperating?
    private gameState: GameState,
    private eventHandler: EventHandler,
    private rl: readline.ReadLine,
    killSwitch: KillSwitch) {

    // the injected handler needs to stop the game, but has to execute an event-producing call from the game engine to do so,
    // so inject the kill switch into the handler and the text-engine so that the handler can trigger the stop on the text engine that owns it
    killSwitch.on('stop', () => this.requestStop());
  }

  start() {
    this.rl.on('line', (line: string) => this.handleInput(line));
    console.log(CLEAR_SCREEN_CODE);

    const response = this.gameEngine.startGame(this.gameState);
    this.handleEvents(response.events);

    this.rl.prompt();
  }

  private requestStop() {
    this.rl.question(style.gamemaster('\nAre you sure you want to leave the game? [Y/n] '), (answer) => {
      if (answer.match(/^y$|^yes$|^$/i)) {
        this.stop();
        return;
      }

      this.rl.prompt();
    });
  }

  private stop() {
    const response = this.gameEngine.stopGame(this.gameState);
    this.handleEvents(response.events);

    this.rl.close();
  }

  private handleInput(input: string) {
    const response = this.gameEngine.handleInput(this.gameState, input);
    this.handleEvents(response.events);

    this.rl.prompt();
  }

  private handleEvents(events: Array<any>): void {
    events.forEach((event: any) => {
      this.eventHandler.handle(this.gameState, event);
    });
  }
}



