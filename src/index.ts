'use strict';

const getopt = require('node-getopt');

import readline = require('readline');

// event handlers
import { EventHandler } from './event-handler';
import { GameEventHandler } from './game-event-handler';
import { DebugEventLogger } from './debug-event-logger';

// client-side parsers
import { ListStylesParser } from './parsers/list-styles-parser';
import { ApplyStyleParser } from './parsers/apply-style-parser';

import { style } from './style';

import { TextEngine } from './text-engine';
import { TextAdventureCore as Core } from '@dshaneg/text-adventure-core';

// repositories
const gameDefinitionRepository = new Core.defaultImplementations.GameDefinitionRepository();
const mapNodeRepository = new Core.defaultImplementations.MapNodeRepository();
const itemRepository = new Core.defaultImplementations.ItemRepository();
const gameSessionRepository = new Core.defaultImplementations.GameSessionRepositoryMem();

const opt = getopt.create([
  ['d', 'debug', 'turn on debug output'],
  ['', 'dev', 'turn on dev mode (enables cheats)'],
  ['', 'style=ARG', 'set the color palette for the game'],
  ['h', 'help', 'display this help']
]).bindHelp()
  .parseSystem();

const parserHead = new ListStylesParser();
const parserTail = parserHead
  .setNext(new ApplyStyleParser());

const initialStyle = style.isStyle(opt.options.style) ?
  opt.options.style :
  style.defaultStyleName;

const gameState = Core.createGameManager(gameSessionRepository).createGame();
const gameEngine = Core.createGameEngine(gameDefinitionRepository, mapNodeRepository, itemRepository, true);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let eventHandler: EventHandler = new GameEventHandler(gameEngine, rl);
if (opt.options.debug) {
  eventHandler = new DebugEventLogger(eventHandler);
}

const textEngine = new TextEngine(gameEngine, gameState, parserHead, eventHandler, rl, initialStyle);

textEngine.start();
