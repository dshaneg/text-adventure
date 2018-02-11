'use strict';

import { EventEmitter } from 'events';

export class KillSwitch extends EventEmitter {
  execute() {
    this.emit('stop-game');
  }
}