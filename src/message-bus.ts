'use strict';

import postal = require('postal');

const postalReqRes = require('postal.request-response');

const bus = postalReqRes(postal);

bus.configuration.promise.createDeferred = function createDeferred() {
  const deferred: any = {};
  deferred.promise = new Promise((resolve, reject) => {
    deferred.resolve = resolve;
    deferred.reject = reject;
  });
  return deferred;
};

bus.configuration.promise.getPromise = function getPromise(deferred: any) {
  return deferred.promise;
};

export const eventChannel = bus.channel('/game/events');
export const queryChannel = bus.channel('/game/queries');
export const commandChannel = bus.channel('/game/commands');
export const clientEventChannel = bus.channel('/client/events');
export const clientCommandChannel = bus.channel('/client/commands');
