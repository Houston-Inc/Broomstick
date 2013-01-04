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
            'name': 'bootstrap-button',
            'location': 'jam/bootstrap/js',
            'main': './bootstrap-button'
        },
        {
            'name': 'bootstrap-modal',
            'location': 'jam/bootstrap/js',
            'main': './bootstrap-modal'
        },
        {
            'name': 'bootstrap-alert',
            'location': 'jam/bootstrap/js',
            'main': './bootstrap-alert'
        },
        {
            'name': 'console',
            'location': 'lib',
            'main': './console'
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
    'underscore.string',
    'backbone',
    'transparency',
    'bootstrap',
    'keymaster',
    'domReady',
    'console',
    'tools',
    'config',
    'features/application'
], function(
    $,
    _,
    _s,
    Backbone,
    transparency,
    bootstrap,
    keymaster,
    domReady,
    console,
    tools,
    config,
    ApplicationFeature
) {
    // Remove no-js
    $('html').removeClass('no-js');
    console = window.console;

    $.noConflict();
    _.noConflict();
    Backbone.noConflict();
    keymaster.noConflict();

    // Transparency used as jQuery plugin with $('#id').render afterwards
    transparency.register($);
    // Mix in the underscore.string methods to underscore
    _.mixin(_s.exports());

    domReady(function() {
        // Load templateStorage html
        tools.templateStorage.initialize();

        var application = new ApplicationFeature();

        application.when(application.isResolved(), function() {
            if(config.DEBUG) {
                console.log("-- Render start");
            }
            application.render();
            application.publish('application.ready');
        });
    });

});
