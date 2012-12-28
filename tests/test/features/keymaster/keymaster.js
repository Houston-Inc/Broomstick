define([
    'features/keymaster/keymaster',
    'tools',
    'test-assets',
    'lib/testtools'
], function(KeyMaster, tools, testAssets, testtools) {
    "use strict";

    var self = this,
        keyMaster,
        feature;

    describe('KeyMasterFeature', function() {
        beforeEach(function() {
            tools.eventMachine.clear();
            keyMaster = new KeyMaster(tools);
            feature = new testAssets.DummyFeature();
        });

        afterEach(function(){
        });

        describe('#initialize', function() {
            it('should initialize successfully', function() {
                expect(keyMaster).to.be.ok();
            });
        });
        describe('#registerKeyEvent', function() {
            it('should register key event', function(done) {
                tools.eventMachine.subscribe('foo', function() {
                    done();
                });
                tools.eventMachine.publish('keys.registerKeyEvents', feature);
                testtools.keydown(65); testtools.keyup(65);
            });
            it('should register scoped key event', function(done) {
                tools.eventMachine.subscribe('keys.scopeSet', function() {
                    done();
                });
                tools.eventMachine.publish('keys.registerKeyEvents', feature);
                tools.eventMachine.publish('keys.setScope', 'bar');
                testtools.keydown(66); testtools.keyup(66);
            });
        });
        describe('#setScope', function() {
            it('should send scope set event', function(done) {
                tools.eventMachine.subscribe('keys.scopeSet', function(scope) {
                    expect(scope).to.eql('bar');
                    done();
                });
                tools.eventMachine.publish('keys.setScope', 'bar');
            });
        });
        /*describe('#clear', function() {
            it('resets key events', function(done) {
                keyMaster.clear();
            });
        });*/
    });
});
