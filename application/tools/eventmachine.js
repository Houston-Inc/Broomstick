define(['underscore', 'config', 'tools/polyfills'], function(_, config, polyfills) {
    "use strict";
    // Publish / Subscribe
    var EventMachineSubscriptions = function(){},
        subscriptions = new EventMachineSubscriptions(),
        EventMachineCalls = function(){},
        eventCalls = new EventMachineCalls(),
        eventMachine = {
            name: 'eventMachine',
            subscribe: function(eventName, eventHandlers) {
                var self = this;
                if(!_.isArray(subscriptions[eventName])) {
                    subscriptions[eventName] = [];
                }
                subscriptions[eventName].push(eventHandlers);
            },

            unsubscribe: function(eventName, eventHandlers) {
                if(_.isArray(subscriptions[eventName])) {
                    subscriptions[eventName] = _.without(subscriptions[eventName], eventHandlers);
                }
            },

            isSubscribed: function(eventName, eventHandler) {
                return _.contains(subscriptions[eventName], eventHandler);
            },

            clear: function() {
                var self = this;
                self.publish('eventMachine:clear', {
                    "machine": self,
                    "subscriptions": subscriptions
                });
                subscriptions = new EventMachineSubscriptions();
                eventCalls = new EventMachineCalls();

            },

            publish: function(eventName, eventData) {
                var self = this;
                if(config.DEBUG && config.EVENTS) {
                    console.log(eventName, eventData !== undefined ? eventData : null);
                    console.log(_.clone(subscriptions));
                }
                if(subscriptions[eventName]) {
                    _.each(subscriptions[eventName], function(eventHandler, index) {
                        if(config.SET_IMMEDIATE) {
                            setImmediate(function() {
                                self.callEventHandler(eventHandler, eventData);
                            });
                        } else {
                            self.callEventHandler(eventHandler, eventData);
                        }
                        self.addToEventCalls(eventName, index);
                    });
                }
            },

            callEventHandler: function(eventHandler, eventData) {
                if(config.DEBUG && config.EVENTS) {
                    console.log('eventMachine.callEventHandler with', eventData);
                }
                if(!!eventHandler.scope) {
                    eventHandler.apply(eventHandler.scope, [eventData]);
                } else {
                    eventHandler.apply(undefined, [eventData]);
                }
            },

            getSubscriptions: function() {
                var list = {};
                _.each(subscriptions, function(eventSubscriptions, eventName) {
                    list[eventName] = [];
                    _.each(eventSubscriptions, function(subscription, key) {
                        if(!!subscription.listener) {
                            list[eventName].push(subscription.listener.name);
                        }
                    });
                });
                return list;
            },

            addToEventCalls: function(eventName, index) {
                if(!eventCalls[eventName]) {
                    eventCalls[eventName] = {};
                }
                if(!eventCalls[eventName][index]) {
                    eventCalls[eventName][index] = 0;
                }
                eventCalls[eventName][index]++;
            },

            hasBeenCalled: function(eventName, handler) {
                return this.callCount(eventName, handler) > 0;
            },

            callCount: function(eventName, handler) {
                var index = -1,
                    ret = 0;
                if(handler) {
                    _.find(subscriptions[eventName], function(method, indx) {
                        var is = false;
                        if(method === handler || method.callback === handler) {
                            index = indx;
                            is = true;
                        }
                        return is;
                    });
                    if(index > -1) {
                        ret = eventCalls[eventName][index];
                    }
                }
                else {
                    _.each(eventCalls[eventName], function(value) {
                        ret += value;
                    });
                }
                return ret;
            }
        };

    if(config.DEBUG_EM) {
        console.log(subscriptions);
        console.log(eventCalls);
    }

    return eventMachine;
});
