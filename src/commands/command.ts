'use strict';

export interface Command {
  topic: string;
  data: { sessionToken?: string }
}
