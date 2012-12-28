define([
    'jquery',
    'transparency',
    'features/router/router',
    'features/baseFeature',
    'features/featureContainer',
    'tools',
    'lib/testtools',
    'features'
], function($, transparency, Router, BaseFeature, FeatureContainer, tools, testtools, features) {
    "use strict";

    var self = this,
        baseFeature,
        router,
        originalURL,
        staticHandler = function() {
            return true;
        },
        eventMachine = tools.eventMachine;

    transparency.register($);

    describe('BaseFeature', function() {
        beforeEach(function() {
            router = new Router();
            baseFeature = new BaseFeature();
            baseFeature.features = new FeatureContainer();
        });

        afterEach(function(){
            testtools.afterEach();
        });

        describe('#initialize', function() {
            it('initializes successfully', function() {
                var baseFeature = new BaseFeature();
                expect(baseFeature).to.be.ok();
            });
        });
        describe('#initalizeGlobalEvents', function() {
            it('responds to subscribed "test" event', function(done) {
                var Feature = BaseFeature.extend({
                    globalEvents : {
                        'test' : 'test'
                    },

                    test : function(data) {
                        expect(data).to.be.eql("response");
                        done();
                    }
                });

                var feature = new Feature();
                feature.publish('test','response');
            });
        });

        describe('#isRenderable', function() {
            it('returns false by default', function() {
                expect(baseFeature.isRenderable()).to.be(false);
            });
        });

        describe('#extend', function() {
            it('adds new attributes to prototype', function() {
                var Feature = BaseFeature.extend({
                    a: 'a',
                    b: function() {
                        return 'b';
                    }
                });
                expect(Feature.prototype.a).to.be.ok();
                expect(Feature.prototype.a).to.be.a('string');

                expect(Feature.prototype.b).to.be.ok();
                expect(Feature.prototype.b).to.be.a('function');
            });
            it('contains helper method accessing models', function(done) {
                var baseFeature = BaseFeature.extend();
                expect(baseFeature.prototype.getModel).to.be.a("function");
                done();
            });
            it('contains helper method accessing collections', function(done) {
                var baseFeature = BaseFeature.extend();
                expect(baseFeature.prototype.getCollection).to.be.a("function");
                done();
            });
            it('contains helper method accessing views', function(done) {
                var baseFeature = BaseFeature.extend();
                expect(baseFeature.prototype.getView).to.be.a('function');
                done();
            });
            it('contains helper method accessing config', function(done) {
                var baseFeature = BaseFeature.extend();
                expect(baseFeature.prototype.getConfig).to.be.a('function');
                done();
            });
        });
        describe('#isFeature', function() {
            it('returns true if object is a feature', function() {
                var NewFeature = BaseFeature.extend();
                expect(new NewFeature().isFeature()).to.be.ok();
            });
            it('returns false if object is not a feature', function() {
                expect(BaseFeature.prototype.isFeature({})).to.not.be.ok();
            });
        });
        describe('#registerFeature', function() {
            it('returns sampleFeature', function() {
                var sampleFeature;
                sampleFeature = baseFeature.registerFeature(new (BaseFeature.extend({
                    name: 'SampleFeature',
                    initialize: function() {
                        this.loaded = $.Deferred();
                    }
                })));
                expect(sampleFeature).to.be.ok();
            });
        });
        describe('#isSubscribed', function() {
            it('returns true if handler is subscribed to an event', function() {
                baseFeature.subscribe('arr:pörr', staticHandler);
                expect(baseFeature.isSubscribed('arr:pörr', staticHandler)).to.be.ok();
            });
        });
        describe('#subscribe', function() {
            it('subscribes a handler to an event', function() {
                baseFeature.subscribe('arr:pörr', staticHandler);
                expect(baseFeature.isSubscribed('arr:pörr', staticHandler)).to.be.ok();
            });
        });
        describe('#publish', function() {
            it('publishes event', function(done) {
                var handler = function() {
                    done();
                };
                baseFeature.subscribe('arr:pörr', handler);
                baseFeature.publish('arr:pörr');
            });
        });
        describe('#initializeGlobalEvents', function() {
            it('initializes the event subscriptions', function(done) {
                var Feat = BaseFeature.extend({
                    globalEvents: {
                        'namespace.event': 'eventHandler'
                    },
                    eventHandler: function() {
                        done();
                    }
                });
                var feat = new Feat();
                feat.publish('namespace.event');
            });
            it('supports calling methods that are in the prototype', function(done) {
                var FeatCalled = false,
                    ExtFeatCalled = false;
                var Feat = BaseFeature.extend({
                    name: 'Feat',
                    initialize: function() {
                        this.foo = 1;
                    },
                    globalEvents: {
                        'namespace.eventti': 'eventHandler'
                    },
                    eventHandler: function() {
                        if(this.name === 'Feat') {
                            expect(this.foo).to.eql(1);
                            FeatCalled = true;
                        }
                        if(this.name === 'ExtFeat') {
                            expect(this.foo).to.eql(2);
                            ExtFeatCalled = true;
                        }
                        if(FeatCalled && ExtFeatCalled) {
                            done();
                        }
                    }
                });
                var ExtFeat = Feat.extend({
                    name: 'ExtFeat',
                    initialize: function() {
                        this.foo = 2;
                    }
                });
                var feat = new Feat();
                var extFeat = new ExtFeat();
                feat.publish('namespace.eventti');
            });
        });
        describe('#featureActivated', function() {
            beforeEach(function() {
                originalURL = window.location.pathname + window.location.search;
            });
            afterEach(function(){
                router.navigate(originalURL);
            });
            it('sends router.navigate event', function(done) {
                eventMachine.subscribe('router.navigate', function() {
                    done();
                });

                baseFeature.featureActivated({ feature: baseFeature, eventSource: {} });
            });
        });
    });
});
