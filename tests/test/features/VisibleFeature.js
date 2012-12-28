define([
    'jquery',
    'transparency',
    'backbone',
    'features/VisibleFeature',
    'features/featureContainer',
    'tools',
    'lib/testtools'
], function($, transparency, Backbone, VisibleFeature, FeatureContainer, tools, testtools) {
    "use strict";

    var feature;

    transparency.register($);

    describe('VisibleFeature', function() {
        beforeEach(function(){
            feature = new VisibleFeature();
            feature.features = new FeatureContainer();
        });

        afterEach(function(){
            testtools.afterEach();
        });

        describe('#initialize', function() {
            it('initializes successfully', function() {
                var feature = new VisibleFeature();
                expect(feature).to.be.ok();
            });
        });
        describe('#setRendered', function() {
            it('sets rendered to given value', function() {
                feature.setRendered(true);
                expect(feature._rendered).to.be(true);
            });
        });
        describe('#isRenderable', function() {
            it('returns true by default', function() {
                expect(feature.isRenderable()).to.be(true);
            });
        });
        describe('#isRendered', function() {
            it('returns false by default', function() {
                expect(feature.isRendered()).to.be(false);
            });
            it('returns the value given in setRendered', function() {
                feature.setRendered(true);
                expect(feature.isRendered()).to.be(true);
            });
        });
        describe('#templatesResolved', function() {
            it('returns the jQuery Deferred from template storage', function() {
                expect(feature.templatesResolved()).to.not.be.empty();
                expect(feature.templatesResolved()).to.have.keys('done',
                                                                 'state');
            });
        });
        describe('#render', function() {
            it('inherited Backbone.View render exists', function() {
                expect(feature.render).to.be.a('function');
                expect(feature.render).to.be.eql(Backbone.View.prototype.render);
            });
        });
    });
});
