'use strict';

export type AddEventCall = (event: any) => void;

export interface Command {
  execute(addEvent: AddEventCall): void;
}
