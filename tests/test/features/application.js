define([
    'jquery',
    'transparency',
    'features/application',
    'features/baseFeature',
    'tools',
    'features',
    'lib/testtools'
], function($, transparency, ApplicationFeature, BaseFeature, tools, features, testtools) {
    "use strict";

    var self = this,
        application;

    transparency.register($);

    describe('ApplicationFeature', function() {
        beforeEach(function() {
            //BaseFeature.prototype.featuresProxy = features;
            //application = new ApplicationFeature();
        });

        describe('#initialize', function() {
            it('should initialize successfully', function() {
                //expect(application).to.be.ok();
            });
        });

        describe('#registerFeature', function() {
            it('should return feature when registerFeature is called', function() {
                //var ins = application.registerFeature("ApplicationFeature");
                //expect(ins).to.not.be.empty();
            });
        });
    });
});
