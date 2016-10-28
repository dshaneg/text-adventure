'use strict';

const getopt = require('node-getopt');

import { TextEngine } from './text-engine';

import { DebugEventLogger } from './debug-event-logger';
import { style } from './style';

const opt = getopt.create([
  ['d', 'debug', 'turn on debug output'],
  ['', 'dev', 'turn on dev mode (enables cheats)'],
  ['', 'style=ARG', 'set the color palette for the game'],
  ['h', 'help', 'display this help']
]).bindHelp()
  .parseSystem();

if (opt.options.debug) {
  DebugEventLogger.subscribe();
}

// command parsers
import { MoveParser } from './parsers/move-parser';
import { ListInventoryParser } from './parsers/list-inventory-parser';
import { ExitParser } from './parsers/exit-parser';
import { HelpParser } from './parsers/help-parser';
import { ListStylesParser } from './parsers/list-styles-parser';
import { ApplyStyleParser } from './parsers/apply-style-parser';

// dev-mode (cheat) command parsers
import { TeleportParser } from './parsers/teleport-parser';
import { ConjureItemParser } from './parsers/conjure-item-parser';

const parser = new MoveParser();
const chainTail = parser
  .setNext(new ListInventoryParser())
  .setNext(new ExitParser())
  .setNext(new HelpParser())
  .setNext(new ListStylesParser())
  .setNext(new ApplyStyleParser());

if (opt.options.dev) {
  chainTail
    .setNext(new TeleportParser())
    .setNext(new ConjureItemParser());
}

import { GameEngine } from './game-engine';

const gameEngine = new GameEngine();
gameEngine.initialize();

const initialStyle = style.isStyle(opt.options.style) ?
  opt.options.style :
  gameEngine.style;

const textEngine = new TextEngine(parser, initialStyle);

textEngine.start();
