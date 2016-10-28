'use strict';

export abstract class CommandHandler {
  private subscribed: boolean;

  subscribe() {
    if (this.subscribed) {
      return;
    }

    this.subscribeToTopic();

    this.subscribed = true;
  }

  abstract subscribeToTopic(): void;
}
