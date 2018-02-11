'use strict';

export interface Command {
  execute(events: Array<any>): void;
}
