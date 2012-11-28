define(['tools/eventmachine'], function(eventMachine) {
    "use strict";

    describe('eventMachine', function() {
        beforeEach(function() {
            eventMachine.clear();
        });
        describe('#subscribe', function() {
            it('should subscribe an event handler to given event', function(done) {
                eventMachine.subscribe('foo', function() {
                    done();
                });
                eventMachine.publish('foo');
            });
        });
        describe('#unsubscribe', function() {
            it('should unsubscribe an event handler from given event', function(done) {
                var times = 0;
                var handler = function() {
                    times++;
                };

                eventMachine.subscribe('foo2', handler);
                eventMachine.publish('foo2', "first!");
                eventMachine.unsubscribe('foo2', handler);
                eventMachine.publish('foo2', "should not go and !");
                expect(times).to.be.eql(1);
                done();
            });
        });
        describe('#isSubscribed', function() {
            it('should return true if event handler has subscribed to an event', function() {
                var handler = function() {
                    return true;
                };
                eventMachine.subscribe('foo', handler);
                expect(eventMachine.isSubscribed('foo', handler)).to.be.ok();
            });
            it('should return false if event handler is not subscribed to an event', function() {
                var handler = function() {
                    return true;
                };
                expect(eventMachine.isSubscribed('foo', handler)).to.not.be.ok();
            });
        });
        describe('#publish', function() {
            it('should call event handlers when published', function(done) {
                eventMachine.subscribe('lör', function() {
                    done();
                });
                eventMachine.publish('lör');
            });
            it('should pass parameters to the event handlers', function(done) {
                eventMachine.subscribe('☃', function(eventData) {
                    expect(eventData.one).to.eql(1);
                    expect(eventData.two).to.eql(2);
                    done();
                });
                eventMachine.publish('☃', {
                    "one": 1,
                    "two": 2
                });
            });
        });
        describe('#clear', function() {
            it('should clear all the subscriptions', function(done) {
                eventMachine.subscribe('årr', function() {
                    done('årr handler still got called!');
                });
                eventMachine.subscribe('murr', function() {
                    done('murr handler still got called!', function() {
                    });
                });
                eventMachine.clear();
                eventMachine.publish('årr');
                eventMachine.publish('murr');
                done();
            });
            it('should publish a eventMachine:clear event when cleared', function(done) {
                eventMachine.subscribe('eventMachine:clear', function(eventData) {
                    expect(eventData.machine).to.be.ok();
                    expect(eventData.subscriptions).to.not.be.empty();
                    expect(eventData.subscriptions['eventMachine:clear']).to.not.be.empty();
                    done();
                });
                eventMachine.clear();
            });
        });
        describe('#hasBeenCalled', function() {
            it('returns true if event handler has been called', function() {
                var callback = function() {
                };
                eventMachine.subscribe('lol', callback);
                eventMachine.publish('lol');
                expect(eventMachine.hasBeenCalled('lol', callback)).to.be.ok();
            });
            it('event handlers with given namespace have been called', function() {
                var callback = function() {
                };
                eventMachine.subscribe('lol', callback);
                eventMachine.publish('lol');
                expect(eventMachine.hasBeenCalled('lol')).to.be.ok();
            });
        });
        describe('#callCount', function() {
            it('return call count of given event namespace and event handler', function() {
                var callback = function() {
                };
                eventMachine.subscribe('lol', callback);
                eventMachine.publish('lol');
                var anotherCallback = function() {};
                eventMachine.subscribe('lol', anotherCallback);
                eventMachine.publish('lol');
                expect(eventMachine.callCount('lol', callback)).to.eql(2);
            });

            it('return call count of given event namespace', function() {
                var callback = function() {
                };
                eventMachine.subscribe('lol', callback);
                eventMachine.publish('lol');
                eventMachine.publish('lol');
                expect(eventMachine.callCount('lol')).to.eql(2);
            });
        });
    });
});
