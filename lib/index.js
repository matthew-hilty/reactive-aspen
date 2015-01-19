var extend, getAspenInitializer, getChannelConnectors, getPortConnector, getReactiveAspen, getRegistrationUtils;

extend = require('./utilities').extend;

getAspenInitializer = require('./getAspenInitializer');

getChannelConnectors = require('./getChannelConnectors');

getPortConnector = require('./getPortConnector');

getRegistrationUtils = require('./getRegistrationUtils');

getReactiveAspen = function(renderToDOM, connectTo, EventManager) {
  var Controller, appStateProperty, blockTillReady, config1, config2, connect, connectPortsToBuses, connectors, createEventStreamBus, createNonInitPropertyBus, doAsync, getDispatcher, getEventStream, getProperty, initialize, onValue, portConnector, push, registrationUtils, relayReactEvents, terminusEventStream, _ref, _ref1;
  _ref = EventManager.factories, createEventStreamBus = _ref.createEventStreamBus, createNonInitPropertyBus = _ref.createNonInitPropertyBus;
  _ref1 = EventManager.utilities, blockTillReady = _ref1.blockTillReady, connect = _ref1.connect, doAsync = _ref1.doAsync, onValue = _ref1.onValue;
  config1 = {
    connect: connect,
    createEventStreamBus: createEventStreamBus,
    createNonInitPropertyBus: createNonInitPropertyBus
  };
  registrationUtils = getRegistrationUtils(config1);
  getDispatcher = registrationUtils.getDispatcher;
  getEventStream = registrationUtils.getEventStream;
  getProperty = registrationUtils.getProperty;
  appStateProperty = getProperty('_appState_');
  terminusEventStream = getEventStream('_terminus_');
  config2 = {
    connect: connect,
    getDispatcher: getDispatcher,
    onValue: onValue,
    terminusEventStream: terminusEventStream
  };
  connectors = getChannelConnectors(config2);
  push = connectors.push;
  portConnector = getPortConnector(getEventStream, getProperty);
  connectPortsToBuses = portConnector.connectPortsToBuses;
  relayReactEvents = portConnector.relayReactEvents;
  initialize = getAspenInitializer({
    appStateProperty: appStateProperty,
    blockTillReady: blockTillReady,
    connectPortsToBuses: connectPortsToBuses,
    connectViewToController: function() {
      return connectTo(relayReactEvents);
    },
    doAsync: doAsync,
    onValue: onValue,
    push: push,
    renderToDOM: renderToDOM,
    terminusEventStream: terminusEventStream
  });
  Controller = extend({}, connectors, registrationUtils);
  return {
    appStateProperty: appStateProperty,
    Controller: Controller,
    initialize: initialize
  };
};

module.exports = getReactiveAspen;
