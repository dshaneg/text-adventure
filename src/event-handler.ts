'use strict';

export interface EventHandler {
  handle(gameState: any, event: any): void;
}