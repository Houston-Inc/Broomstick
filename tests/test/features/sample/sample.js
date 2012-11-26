define([
    'jquery',
    'transparency',
    'features/sample/sample',
    'lib/testtools'
], function($, transparency, Sample, testtools) {
    "use strict";

    var self = this,
        sample;

    transparency.register($);

    /*describe('SampleFeature', function() {
        beforeEach(function(){
            testtools.beforeEach();
            $('#testdata').append('<li id="SampleFeature"></li>');
            sample = new Sample();
        });

        afterEach(function(){
            testtools.afterEach();
        });

        describe('#initialize', function() {
            it('should initialize successfully', function(done) {
                var instance = new Sample();
                expect(instance).to.be.ok();
                done();
            });

            it('should publish moduleInitialized event on initialize', function(done) {
                sample.subscribe('moduleInitialized', function(feature) {
                    done();
                });
                new Sample();
            });
        });
    });*/
});
