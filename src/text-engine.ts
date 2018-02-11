'use strict';

import readline = require('readline');
import { style } from './style';
import { Parser } from './parsers/parser';
import { EventHandler } from './event-handler';
import { TextAdventureCore as Core } from '@dshaneg/text-adventure-core';
// const GameEngine = Core.interfaces.GameEngine;
// const GameState = Core.interfaces.GameState;

const nodeCleanup = require('node-cleanup');

// makes sure that wonky colors don't hang around after the program terminates
nodeCleanup(() => process.stdout.write(style.defaultClose));

const CLEAR_SCREEN_CODE = '\x1Bc';

export class TextEngine {
  constructor(
      private gameEngine: any, // why isn't ts cooperating?
      private gameState: any,
      private parser: Parser,
      private eventHandler: EventHandler,
      private rl: readline.ReadLine,
      initialStyle: string) {

    this.parser = parser;

    if (initialStyle) {
      try {
        style.set(initialStyle);
      } catch (error) {
        // eat it
      }
    }
  }

  private clientEvents = new Array<any>();

  private addEvent(event: any): void {
    this.clientEvents.push(event);
  }

  start() {
    this.rl.on('line', (line: string) => this.handleInput(line));

    console.log(CLEAR_SCREEN_CODE);

    const response = this.gameEngine.startGame(this.gameState);
    this.handleEvents(response.events);
  }

  stop() {
    const response = this.gameEngine.stopGame(this.gameState);
    this.handleEvents(response.events);
  }

  handleInput(input: string) {
    let events: any;

    // Parse for any client-side events before passing the input over to the game engine
    const command = this.parser.parseInput(input);
    if (command) {
      this.clientEvents = new Array<any>(); // todo: ugly
      command.execute(this.addEvent);
      events = this.clientEvents;
    } else {
      events = this.gameEngine.handleInput(this.gameState, input).events;
    }

    this.handleEvents(events);
  }

  handleEvents(events: Array<any>): void {
    events.forEach((event: any) => {
      this.eventHandler.handle(this.gameState, event);
    });
  }
}



