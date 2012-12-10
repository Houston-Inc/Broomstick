"use strict";
/*global require*/
require.config({
    baseUrl: '/',
    paths: {
        models:         'models',
        collections:    'collections',
        templates:      'templates',
        views:          'views',
        features:       'features'
    },
    packages: [
        {
            "name": "bootstrap-button",
            "location": "jam/bootstrap/js",
            "main": "./bootstrap-button"
        },
        {
            "name": "bootstrap-modal",
            "location": "jam/bootstrap/js",
            "main": "./bootstrap-modal"
        },
        {
            "name": "bootstrap-alert",
            "location": "jam/bootstrap/js",
            "main": "./bootstrap-alert"
        }
    ],
    shim: {
        'backbone': {
            //These script dependencies should be loaded before loading
            //backbone.js
            deps: ['underscore', 'jquery'],
            //Once loaded, use the global 'Backbone' as the
            //module value.
            exports: 'Backbone'
        },
        'highcharts': {
            deps: ['jquery'],
            exports: 'Highcharts'
        },
        'keymaster': {
            exports: 'key'
        },
        'flexpaper': {
            deps: ['jquery','jqueryExtension']
        },
        'bootstrap-button': {
            deps: ['jquery']
        },
        'bootstrap-modal': {
            deps: ['jquery']
        },
        'bootstrap': {
            deps: ['bootstrap-button','bootstrap-modal']
        },
        'collections': {
            deps: ['models']
        },
        'views': {
            deps: ['transparency', 'collections', 'tools']
        },
        'features': {
            deps: ['views']
        }
    }
});

require([
    'jquery',
    'underscore',
    'backbone',
    'transparency',
    'bootstrap',
    'keymaster',
    'domReady',
    'tools',
    'models',
    'collections',
    'views',
    'features',
    'config'
], function(
    $,
    _,
    Backbone,
    transparency,
    bootstrap,
    keymaster,
    domReady,
    tools,
    models,
    collections,
    views,
    features,
    config
) {
    $.noConflict();
    _.noConflict();
    Backbone.noConflict();
    keymaster.noConflict();

    domReady(function() {
        // Load templateStorage html
        tools.templateStorage.initialize();

        // Work around this, by changing dependency chains
        var BaseFeature = features.get('BaseFeature');
        BaseFeature.prototype.setFeaturesProxy(features);

        transparency.register($);

        var ApplicationFeature = features.get('ApplicationFeature'),
            application = new ApplicationFeature();

        application.when(application.isResolved(), function() {
            //console.log("-- Render start");
            application.render();
            application.publish('application.ready');
        });
    });

});
