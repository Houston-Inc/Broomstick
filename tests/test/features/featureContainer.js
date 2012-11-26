define([
    'jquery',
    'transparency',
    'features/featureContainer',
    /*'tools',*/
    'lib/testtools'
], function($, transparency, FeatureContainer, /*tools,*/ testtools) {
    "use strict";

    var self = this,
        instance,
        features;

    transparency.register($);

    describe('FeatureContainerFeature', function() {
        beforeEach(function(){
            testtools.beforeEach();
            instance = new FeatureContainer();
        });

        afterEach(function(){
            testtools.afterEach();
        });

        describe('#initialize', function() {
            it('should initialize successfully', function(done) {
                expect(instance).to.be.ok();
                done();
            });
        });

        describe('#utils', function() {
            beforeEach(function() {
                features = testtools.createFeatures();
                for(var i=0; i<features.length; i++) {
                    instance.add(features[i]);
                }
            });

            it('should get feature index from container', function(done) {
                expect(instance.indexOf(features[1])).to.be.eql(1);
                done();
            });
        });

    });
});
