/*global require: true*/
"use strict";

// Configure RequireJS
require.config({
    baseUrl:'.',
    urlArgs: "v="+(new Date()).getTime(),
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
        mocha_yeti:             'lib/mocha-yeti-adaptor',
        specs:                  'specs',
        mocha:                  'lib/mocha',
        expect:                 'lib/assertion/expect',
        jquery:                 '../application/jam/jquery/jquery',
        bootstrap:              'bootstrap',
        'bootstrap-alert':     '../application/jam/bootstrap/js/bootstrap-alert',
        'bootstrap-button':     '../application/jam/bootstrap/js/bootstrap-button',
        'bootstrap-modal':      '../application/jam/bootstrap/js/bootstrap-modal',
        underscore:             '../application/jam/underscore/underscore',
        'underscore.string':    '../application/jam/underscore.string/lib/underscore.string',
        backbone:               '../application/jam/backbone/backbone',
        transparency:           '../application/jam/transparency/lib/transparency',
        keymaster:              '../application/jam/keymaster/keymaster',
        models:                 '../application/models',
        collections:            '../application/collections',
        templates:              '../application/templates',
        views:                  '../application/views',
        features:               '../application/features',
        tools:                  '../application/tools',
        config:                 'config'
    }
});

// Require libraries
require(['require',
         'expect',
         'mocha',
         'mocha_yeti'],
        function(require) {
            var self = this || window;
            var globals = ['jQuery*'];
            self.mocha.setup('bdd');
            // Require base tests before starting
            require(['specs'], function(){
                var runner = self.mocha
                        .globals(globals)
                        .run();
                self.BUNYIP.hookup(runner);
            });
});
