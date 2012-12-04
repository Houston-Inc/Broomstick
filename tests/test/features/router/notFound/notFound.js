(function(window) {
    "use strict";

    define([
        'jquery',
        'underscore',
        'transparency',
        'features/router/notFound/notFound',
        'features/router/router',
        'tools/eventmachine',
        'lib/testtools'
    ], function($, _, transparency, NotFound, Router, eventMachine, testtools) {
        var self = this,
            router,
            originalURL,
            notFound;

        transparency.register($);

        describe('NotFoundFeature', function() {
            beforeEach(function(){
                testtools.beforeEach();
                notFound = new NotFound();
                router = new Router();
            });

            afterEach(function(){
                $('#not-found').remove();
                testtools.afterEach();
            });

            describe('#initialize', function() {
                it('should initialize successfully', function() {
                    expect(notFound).to.be.ok();
                });
            });

            // DOM tests
            describe('#render', function() {
                it('renders to DOM', function() {
                    notFound.render();
                    expect($('#not-found')).to.not.be.empty();
                    expect($('#not-found').text()).to.contain("Page not found!");
                });
            });

            describe('#routing', function() {
                beforeEach(function(){
                    originalURL = window.location.pathname + window.location.search;
                });
                afterEach(function(){
                    router.navigate(originalURL);
                });
                it('contains spesific route', function(done) {
                    notFound.subscribe('router.registeredRoute', function(data) {
                        expect(data).to.have.key('route');
                        expect(data.route).to.be.eql("*notFound");
                        expect(data.name).to.be.eql(notFound.name + '.' + 'notFound');
                        done();
                    });
                    router.registerRoutes(notFound);
                });
                it('triggers notFound method when route is not found', function(done) {
                    var feature = testtools.createFeatures()[0];
                    feature.routes = {
                        'Feat/:param1/p:param2': 'routeActivated',
                        'Feat/omg/:param1/p:param2': 'routeActivated'
                    };
                    var routeWasActivated = false;
                    _.extend(feature, {
                        routeActivated: function routeActivated(args) {
                            expect(args[0]).to.eql('param1');
                            expect(args[1]).to.eql('param2');
                            routeWasActivated = true;
                        }
                    });
                    _.extend(notFound, {
                        notFound: function notFound(args) {
                            if(args[0].indexOf("tests") === -1) {
                                expect(routeWasActivated).to.be.ok();
                                expect(args[0]).to.eql('thisShouldTriggerNotFoundFeature');
                                done();
                            }
                        }
                    });
                    router.registerRoutes(notFound);
                    router.registerRoutes(feature);
                    router.navigate('Feat/param1/pparam2');
                    router.navigate('thisShouldTriggerNotFoundFeature');
                });
            });
        });
    });
})(this);
