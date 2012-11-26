/*global window,CollectGarbage */
define([
    'jquery',
    'underscore',
    'backbone',
    'transparency',
    'features/router/router',
    'tools',
    'lib/testtools'
], function($, _, Backbone, transparency, Router, tools, testtools) {
    "use strict";

    var self = this,
        router,
        originalURL,
        eventMachine = tools.eventMachine;

    transparency.register($);

    describe('RouterFeature', function() {
        beforeEach(function(){
            testtools.beforeEach();
            router = new Router();
        });

        afterEach(function(){
            testtools.afterEach();
        });

        describe('#initialize', function() {
            it('should initialize successfully', function() {
                expect(router).to.be.ok();
            });
        });

        describe('#registerRoutes', function() {
            it('is called when router.registerRoutes event is published', function() {
                var feature = testtools.createFeatures()[0];
                eventMachine.publish('router.registerRoutes', feature);
                expect(eventMachine.hasBeenCalled('router.registerRoutes')).to.be.ok();
            });
            it('returns the added routes as map', function() {
                var feature = testtools.createFeatures()[0];
                var registered = router.registerRoutes(feature);
                expect(registered).to.have.keys('DummyFeature/:param1/p:param2',
                                                'LOL/:param1/p:param2');
                expect(registered['DummyFeature/:param1/p:param2'][0]).to.eql(feature.name + '.' + 'routeActivated');
                expect(registered['LOL/:param1/p:param2'][0]).to.eql(feature.name + '.' + 'routeActivated');

            });
            it('publishes event on every registered route', function(done) {
                var feature = testtools.createFeatures()[0],
                    called = 0;
                eventMachine.subscribe('router.registeredRoute', function(data) {
                    called++;
                    if(called === 2) {
                        done();
                    }
                });
                router.registerRoutes(feature);
            });
            it('publishes event on registered route and passes correct values', function(done) {
                var feature = testtools.createFeatures()[0];
                var route1 = false;
                var route2 = false;
                eventMachine.subscribe('router.registeredRoute', function(data) {
                    expect(data).to.have.key('route');
                    if(data.route === 'DummyFeature/:param1/p:param2') {
                        expect(data.feature).to.eql(feature);
                        expect(data.handler).to.eql('routeActivated');
                        expect(data.name).to.eql(feature.name + '.' + 'routeActivated');
                        route1 = true;
                    }
                    if(data.route === 'LOL/:param1/p:param2') {
                        expect(data.feature).to.eql(feature);
                        expect(data.handler).to.eql('routeActivated');
                        expect(data.name).to.eql(feature.name + '.' + 'routeActivated');
                        route2 = true;
                    }
                    if(route1 && route2) {
                        done();
                    }
                });
                router.registerRoutes(feature);
            });
            it('adds the registered routes to _registeredRoutes', function() {
                var features = testtools.createFeatures();
                features[1].routes = {
                    'Feat1/:param1/p:param2': 'routeActivated',
                    'Feat1/lol/:param1/p:param2': 'routeActivated'
                };
                features[2].routes = {
                    'Feat2/:param1/p:param2': 'routeActivated',
                    'Feat2/omg/:param1/p:param2': 'routeActivated'
                };
                _.each(features, function(feature) {
                    router.registerRoutes(feature);
                });
                expect(router._registeredRoutes).to.only.have.keys(
                    'DummyFeature/:param1/p:param2',
                    'LOL/:param1/p:param2',
                    'Feat1/:param1/p:param2',
                    'Feat1/lol/:param1/p:param2',
                    'Feat2/:param1/p:param2',
                    'Feat2/omg/:param1/p:param2');
            });
            it('adds the registered routes to _registeredRoutes', function() {
                var features = testtools.createFeatures();
                features[1].routes = {
                    'Feat1/:param1/p:param2': 'routeActivated',
                    'Feat1/lol/:param1/p:param2': 'routeActivated'
                };
                features[2].routes = {
                    'Feat2/:param1/p:param2': 'routeActivated',
                    'Feat2/omg/:param1/p:param2': 'routeActivated'
                };
                _.each(features, function(feature) {
                    router.registerRoutes(feature);
                });
                var registeredRoutes = router._registeredRoutes;
                expect(registeredRoutes['DummyFeature/:param1/p:param2']).to.eql([features[0].name + '.' + 'routeActivated']);
                expect(registeredRoutes['LOL/:param1/p:param2']).to.eql([features[0].name + '.' + 'routeActivated']);
                expect(registeredRoutes['Feat1/:param1/p:param2']).to.eql([features[1].name + '.' + 'routeActivated']);
                expect(registeredRoutes['Feat1/lol/:param1/p:param2']).to.eql([features[1].name + '.' + 'routeActivated']);
                expect(registeredRoutes['Feat2/:param1/p:param2']).to.eql([features[2].name + '.' + 'routeActivated']);
                expect(registeredRoutes['Feat2/omg/:param1/p:param2']).to.eql([features[2].name + '.' + 'routeActivated']);
            });
        });
        describe('#navigate', function() {
            beforeEach(function() {
                originalURL = window.location.pathname + window.location.search;
            });
            afterEach(function() {
                router.navigate(originalURL);
            });
            it('sends route activation event on route given to it', function(done) {
                var feature = testtools.createFeatures()[0];
                router.registerRoutes(feature);
                eventMachine.subscribe('router.activated', function() {
                    done();
                });
                router.navigate('DummyFeature/lol/papua');
            });
            it('sends route activation event on navigate event', function(done) {
                var feature = testtools.createFeatures()[0];
                router.registerRoutes(feature);
                eventMachine.subscribe('router.activated', function() {
                    done();
                });
                eventMachine.publish('router.navigate', 'DummyFeature/lol/papua');
            });
            it('sends route activation event and passes the event parameters correctly', function(done) {
                var feature = testtools.createFeatures()[0];
                router.registerRoutes(feature);
                eventMachine.subscribe('router.activated', function(params) {
                    expect(params.route).to.eql('DummyFeature/:param1/p:param2');
                    expect(params.feature).to.eql(feature);
                    expect(params.name).to.eql('Feature1.routeActivated');
                    done();
                });
                eventMachine.publish('router.navigate', 'DummyFeature/lol/papua');
            });
            it('calls the features route handler method with correct parameters', function(done) {
                var feature = testtools.createFeatures()[0];
                feature.routes = {
                    'Feat/:param1/p:param2': 'routeActivated',
                    'Feat/omg/:param1/p:param2': 'routeActivated'
                };
                feature.routeActivated = function(args) {
                    expect(args[0]).to.eql('param1');
                    expect(args[1]).to.eql('param2');
                    done();
                };
                router.registerRoutes(feature);
                eventMachine.publish('router.navigate', 'Feat/param1/pparam2');
            });
        });
    });
});
