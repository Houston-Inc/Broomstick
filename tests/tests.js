/*global require*/
"use strict";
var APPLICATION = '../application',
    JAM = APPLICATION + '/jam';
// Configure RequireJS
require.config({
    baseUrl:'.',
    urlArgs: "v="+(new Date()).getTime(),
    packages: [
        {
            name:     'mocha',
            location: 'lib',
            main:     './mocha'
        },
        {
            name:     'expect',
            location: 'lib/assertion',
            main:     './expect'
        },
        {
            name:     'mocha-yeti-adaptor',
            location: 'lib',
            main:     './mocha-yeti-adaptor'
        },
        {
            name:     'jquery',
            location: JAM + '/jquery/dist',
            main:     './jquery'
        },
        {
            name:     'underscore',
            location: JAM + '/underscore',
            main:     './underscore'
        },
        {
            name:     'underscore.string',
            location: JAM + '/underscore.string/lib',
            main:     './underscore.string'
        },
        {
            name:     'backbone',
            location: JAM + '/backbone',
            main:     './backbone'
        },
        {
            name:     'transparency',
            location: JAM + '/transparency/lib',
            main:     './transparency'
        },
        {
            name:     'keymaster',
            location: JAM + '/keymaster',
            main:     './keymaster'
        },
        {
            name:     'bootstrap-button',
            location: JAM + '/bootstrap/js',
            main:     './bootstrap-button'
        },
        {
            name:     'bootstrap-modal',
            location: JAM + '/bootstrap/js',
            main:     './bootstrap-modal'
        },
        {
            name:     'bootstrap-alert',
            location: JAM + '/bootstrap/js',
            main:     './bootstrap-alert'
        },
        {
            name:     'console',
            location: APPLICATION + '/lib',
            main:     './console'
        }
    ],
    shim: {
        'mocha': {
            'exports': 'mocha'
        },
        'expect': {
            exports: 'expect'
        },
        'mocha_yeti': {
            exports: 'BUNYIP'
        },
        'underscore': {
            exports: '_'
        },
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'keymaster': {
            exports: 'key'
        },
        'bootstrap-alert': {
            deps: ['jquery']
        },
        'bootstrap-button': {
            deps: ['jquery']
        },
        'bootstrap-modal': {
            deps: ['jquery']
        },
        'bootstrap': {
            deps: ['bootstrap-button','bootstrap-modal','bootstrap-alert']
        }
    },
    paths: {
        specs:       'specs',
        config:      'config',
        models:      APPLICATION + '/models',
        collections: APPLICATION + '/collections',
        templates:   APPLICATION + '/templates',
        views:       APPLICATION + '/views',
        features:    APPLICATION + '/features',
        tools:       APPLICATION + '/tools'
    }
});

// Require libraries
require(['require',
         'expect',
         'mocha',
         'mocha-yeti-adaptor'],
        function(require) {
            var self = this || window;
            var globals = ['jQuery*'];
            self.mocha.setup('bdd');
            // Require base tests before starting
            require(['specs'], function() {
                var runner = self.mocha
                        .globals(globals)
                        .run();
                self.BUNYIP.hookup(runner);
            });
});
