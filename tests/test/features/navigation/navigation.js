define([
    'jquery',
    'underscore',
    'transparency',
    'features/navigation/navigation',
    'features/visibleFeature',
    'features/section/section',
    'features/keymaster/keymaster',
    'tools',
    'lib/testtools',
    'test-assets'
], function($,
            _,
            transparency,
            Navigation,
            VisibleFeature,
            Section,
            KeyMaster,
            tools,
            testtools,
            testAssets) {
    "use strict";

    var self = this,
        navigation,
        features,
        keys,
        eventMachine = tools.eventMachine;

    transparency.register($);

    describe('NavigationFeature', function() {
        beforeEach(function(){
            testtools.beforeEach();
            var $nav = tools.templateStorage.get(Navigation.prototype.element, true);
            $('#testdata').append($nav);
            keys = new KeyMaster();
            navigation = new Navigation();
        });

        afterEach(function() {
            testtools.afterEach();
        });

        describe('#initialize', function() {
            it('should initialize successfully', function() {
                expect(navigation).to.be.ok();
            });
        });

        describe('#registerFeature', function() {
            it('registers new Feature', function() {
                expect(navigation.registerFeature(navigation)).to.be(true);
            });
            it('registers new Feature on moduleInitialized event', function() {
                var Sample = VisibleFeature.extend({
                    uiName: 'SampleFeature',
                    initialize: function() {
                        this.loaded = $.Deferred();
                        this.publish('moduleInitialized', this);
                    }
                });
                new Sample();
                expect(navigation.features.getAll().length).to.be(1);
            });
            it('has added new feature to array', function() {
                navigation.registerFeature(navigation);
                expect(navigation.features.getAll().length).to.be(1);
            });

            it('publishes navigation.registeredFeature event', function(done) {
                navigation.subscribe('navigation.registeredFeature', function(feature) {
                    expect(feature).to.be(navigation);
                    done();
                });
                navigation.registerFeature(navigation);
            });
        });

        describe('#render', function() {
            beforeEach(function() {
                features = testtools.createFeatures();
                for(var i=0; i<features.length; i++) {
                    navigation.registerFeature(features[i]);
                }
                navigation.render();
            });
            it('renders the registered feature in the list with a link uiName', function() {
                expect($('#navigation')[0]).to.not.be.empty();
                expect($('#navigation').find('li a').first().text()).to.eql(features[0].uiName);
            });

            it('renders data-module attribute with the feature name', function() {
                expect($('#navigation').find('li').first().attr('data-feature')).to.eql(features[0].uiName);
            });

            it('renders data-page attributes according to feature amount, first page 1', function() {
                expect($('#navigation').find('li').first().attr('data-column')).to.eql(1);
            });
            it('renders class so that the current active feature is active', function() {
                expect($('#navigation').find('li').first().attr('class')).to.contain('active');
            });
        });
        describe('#setActiveFeature', function() {
            beforeEach(function() {
                features = testtools.createFeatures();
                for(var i=0; i<features.length; i++) {
                    navigation.registerFeature(features[i]);
                }
                navigation.render();
            });
            it('sets the first element as the current element', function() {
                expect(navigation.activeFeature).to.eql(1);
            });
            it('returns the the current feature', function() {
                expect(navigation.setActiveFeature(2)).to.eql(2);
            });
            it('sets active feature also from DOM event element', function() {
                var $last = $('#navigation').find('li').last();
                expect($last.click().attr('class')).contain('active');
            });
            it('sends event on activeFeatureSet', function(done) {
                eventMachine.subscribe('navigation.activeFeatureSet', function(param) {
                    expect(param.column).to.eql(2);
                    expect(param.feature).to.eql(features[1]);
                    done();
                });
                navigation.setActiveFeature(2);
            });
        });
        describe('#routeActivated', function() {
            beforeEach(function() {
                features = testtools.createFeatures();
                for(var i=0; i<features.length; i++) {
                    navigation.registerFeature(features[i]);
                }
            });
            it('is called when route.activated event is published', function() {
                eventMachine.publish('router.activated', {
                    route: 'DummyFeature/:param1/p:param2/',
                    feature: features[0],
                    args: ['a', 'b'],
                    name: 'DummyFeature.routeActivated'
                });
                expect(eventMachine.hasBeenCalled('router.activated')).to.be.ok();
            });
            it('sets the activated routes feature as active if one is found in navigation', function() {
                eventMachine.publish('router.activated', {
                    route: 'DummyFeature/:param1/p:param2/',
                    feature: features[0],
                    args: ['a', 'b'],
                    name: 'DummyFeature.routeActivated'
                });
                expect(navigation.activeFeature).to.eql(1);
            });
        });
        describe('#left', function() {
            beforeEach(function() {
                features = testtools.createFeatures();
                for(var i=0; i<features.length; i++) {
                    navigation.registerFeature(features[i]);
                }
                navigation.render();
            });
            it('makes the previous feature active if one exits', function() {
                navigation.setActiveFeature(2);
                expect(navigation.left()).to.eql(1);
            });
            it('renders the DOM so that previous feature is active', function() {
                navigation.setActiveFeature(2);
                navigation.left();
                expect($('#navigation').find('[data-column="1"]').attr('class')).to.contain('active');
            });
        });
        describe('#right', function() {
            beforeEach(function() {
                features = testtools.createFeatures();
                for(var i=0; i<features.length; i++) {
                    navigation.registerFeature(features[i]);
                }
            });
            it('makes the next feature active if one exits', function() {
                navigation.setActiveFeature(2);
                expect(navigation.right()).to.eql(3);
            });
            it('renders the DOM so that next feature is active', function() {
                navigation.setActiveFeature(2);
                navigation.right();
                expect($('#navigation').find('[data-column="3"]').attr('class')).to.contain('active');
            });
        });
        describe('keyEvents', function() {
            beforeEach(function() {
                features = testtools.createFeatures();
                for(var i=0; i<features.length; i++) {
                    navigation.registerFeature(features[i]);
                }
            });
            it('triggers left on arrow left', function() {
                navigation.setActiveFeature(2);
                testtools.keydown(37);
                testtools.keyup(37);
                expect($('#navigation').find('[data-column="1"]').attr('class')).to.contain('active');
            });
            it('triggers right on arrow right', function() {
                navigation.setActiveFeature(2);
                testtools.keydown(38);
                testtools.keyup(38);
                expect($('#navigation').find('[data-column="2"]').attr('class')).to.contain('active');
            });
        });
    });
});
