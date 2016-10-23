'use strict';

const postal = require('postal');

const postalReqRes = require('postal.request-response');

const bus = postalReqRes(postal);

bus.configuration.promise.createDeferred = function createDeferred() {
  const deferred = {};
  deferred.promise = new Promise((resolve, reject) => {
    deferred.resolve = resolve;
    deferred.reject = reject;
  });
  return deferred;
};

bus.configuration.promise.getPromise = function getPromise(deferred) {
  return deferred.promise;
};

module.exports = {
  eventChannel: bus.channel('/game/events'),
  queryChannel: bus.channel('/game/queries'),
  commandChannel: bus.channel('/game/commands'),
  clientEventChannel: bus.channel('/client/events'),
  clientCommandChannel: bus.channel('/client/commands')
};
