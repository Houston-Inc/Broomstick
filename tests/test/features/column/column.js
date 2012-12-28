define([
    'jquery',
    'underscore',
    'transparency',
    'features/column/column',
    'tools',
    'lib/testtools'
], function($, _, transparency, Column, tools, testtools) {
    "use strict";

    var self = this,
        module,
        eventMachine = tools.eventMachine;

    transparency.register($);

    describe('ColumnFeature', function() {
        beforeEach(function() {
            testtools.beforeEach();
            module = new Column();
            $('#testdata').append('<div id="main"></div>');
        });

        afterEach(function(){
            testtools.afterEach();
        });

        describe('#initialize', function() {
            it('should initialize successfully', function() {
                expect(module).to.be.ok();
            });
        });

        describe('#addColumn', function() {
            it('publishes event after adding module', function(done) {
                module.subscribe('module.addedFeature', function(feature){
                    expect(feature).to.be(module);
                    done();
                });
                module.registerFeature(module);
            });
            it('adds column to columns array', function(done) {
                module.subscribe('module.addedFeature', function(feature){
                    expect(module.columns).to.contain('column1');
                    done();
                });
                module.registerFeature(module);
            });
            it('adds column to columns array', function(done) {
                var featurePrototypes = testtools.createFeaturePrototypeList(),
                    features = testtools.createFeatures(featurePrototypes),
                    featuresProxy = testtools.createFeaturesProxyObject(featurePrototypes);
                var called = 1;
                module.subscribe('module.addedFeature', function(feature){
                    if(called === 3) {
                        expect(module.columns).to.contain('column1');
                        expect(module.columns).to.contain('column2');
                        expect(module.columns).to.contain('column3');
                        done();
                    }
                    called++;
                });
                for(var i=0; i < features.length; i++) {
                    module.registerFeature(features[i]);
                }
            });
        });

        describe('#render', function() {
            beforeEach(function() {
                module.clear();
                module.render();
            });
            it('adds single feature to DOM with it\'s name as id', function(done) {
                module.subscribe('module.addedFeature', function() {
                    var $el = $('#columns').find('#' + module.name);
                    expect($('#columns')[0]).to.not.be.empty();
                    expect($el.attr('id')).to.eql('ColumnFeature');
                    done();
                });
                module.registerFeature(module);
            });
            it('adds single feature to DOM with data-column attribute as 1', function(done) {
                module.subscribe('module.addedFeature', function() {
                    var $el = $('#columns').find('#' + module.name);
                    expect($el.attr('data-column')).to.eql(1);
                    done();
                });
                module.registerFeature(module);
            });
            it('makes the first feature active', function(done) {
                module.subscribe('module.addedFeature', function() {
                    var $column = $('#columns').find('#' + module.name);
                    expect($('ul#columns').attr('class')).to.contain('column'+$column.attr('data-column'));
                    done();
                });
                module.registerFeature(module);
            });

        });

        describe('#setActiveFeature', function() {
            beforeEach(function() {
                module.clear();
                module.render();
                var features = testtools.createFeatures();
                _.each(features, function(feature, index, list) {
                    module.registerFeature(feature);
                });

            });
            it('is called when navigation.activeFeatureSet event is published', function() {
                eventMachine.publish('navigation.activeFeatureSet', { column: 2 });
                expect(eventMachine.hasBeenCalled('navigation.activeFeatureSet', module.setActiveFeature)).to.be.ok();
            });
            it('sets current column to given column', function() {
                module.publish('navigation.activeFeatureSet', { column: 2 });
                expect($('ul#columns').attr('class')).to.contain('column2');
            });
        });

        describe('#setCurrentColumn', function() {
            beforeEach(function() {
                module.clear();
                module.render();
                var features = testtools.createFeatures();
                _.each(features, function(feature, index, list) {
                    module.registerFeature(module);
                });

            });
            it('should make the given column as the active column', function() {
                eventMachine.publish('module.setCurrentColumn', 2);
                expect($('ul#columns').attr('class')).to.contain('column2');
            });
        });
        describe('#findColumn', function() {
            beforeEach(function() {
                module.clear();
                module.render();
                var features = testtools.createFeatures();
                _.each(features, function(feature, index, list) {
                    module.registerFeature(feature);
                });
            });
            it('should return column jQuery element with number', function() {
                var $column = module.findColumn(1);
                expect($column.attr('data-column')).to.eql(1);
            });
        });
    });
});
