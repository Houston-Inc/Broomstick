(function(window) {
    "use strict";

    define([
        'jquery',
        'transparency',
        'features/windowEventDispatcher',
        'tools',
        'lib/testtools'
    ], function($, transparency, WindowEventDispatcher, tools, testtools) {

        var self = this,
            windowEventDispatcher;

        transparency.register($);

        describe('WindowEventDispatcherFeature', function() {
            beforeEach(function(){
                testtools.beforeEach();
                windowEventDispatcher = new WindowEventDispatcher();
            });

            afterEach(function(){
                testtools.afterEach();
            });

            describe('#initialize', function() {
                it('should initialize successfully', function() {
                    expect(windowEventDispatcher).to.be.ok();
                });
            });

            // Event tests

            describe('#resize', function () {
                it('should publish window.resize on window resize', function(done) {
                    var first = true;
                    windowEventDispatcher.subscribe('window.resize', function() {
                        if(first) {
                            first = !first;
                            done();
                        }
                    });
                    $(window).trigger('resize');
                });
            });

        });
    });
})(this);
