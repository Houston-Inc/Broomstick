"use strict";
module.exports = function(grunt) {

    // Project configuration
    grunt.initConfig({
        lint: {
            all: [
                'grunt.js',
                'application/tools/*.js',
                'application/features/**/*.js',
                'application/models/*.js',
                'application/collections/*.js',
                'application/views/*.js',
                'application/*.js',
                'tests/test/**/*.js'
            ]
        },
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                boss: true,
                eqnull: true,
                node: true,
                es5: true
            },
            globals: {
                define: true,
                describe: true,
                it: true,
                expect: true,
                beforeEach: true,
                afterEach: true,
                setImmediate: true
            }
        },
        watch: {
            js: {
                files: '<config:lint.all>',
                tasks: 'lint'
            },
            html: {
                files: ['application/templates/**/*.html',
                        'application/features/**/*.html'],
                tasks: 'regen'
            },
            less: {
                files: 'application/features/**/*.less',
                tasks: 'init:regenerate-less'
            }
        },
        recess: {
            release: {
                src: ['application/less/main.less'],
                dest: 'release/css/main.css',
                options: {
                    compile: true,
                    compress: true
                }
            }
        },
        requirejs: {
            test: {
                almond: true,
                replaceRequireScript: [{
                    files: ['test-build/test.html'],
                    module: 'tests'
                }],
                modules: [{name: 'tests'}],
                dir: 'test-build',
                appDir: 'tests',
                baseUrl: './',
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
                    'bootstrap-button': {
                        deps: ['bootstrap']
                    },
                    'bootstrap-modal': {
                        deps: ['bootstrap']
                    },
                    'bootstrap-alert': {
                        deps: ['bootstrap']
                    },
                    'bootstrap': {
                        deps: ['bootstrap-button','bootstrap-modal','bootstrap-alert']
                    }
                },
                paths: {
                    mocha_yeti:          'lib/mocha-yeti-adaptor',
                    mocha:               'lib/mocha',
                    expect:              'lib/assertion/expect',
                    specs:               'specs',
                    jquery:              '../application/jam/jquery/jquery',
                    bootstrap:           '../application/jam/bootstrap/main',
                    'bootstrap-button':  '../application/jam/bootstrap/js/bootstrap-button',
                    'bootstrap-alert':   '../application/jam/bootstrap/js/bootstrap-alert',
                    'bootstrap-modal':   '../application/jam/bootstrap/js/bootstrap-modal',
                    underscore:          '../application/jam/underscore/underscore',
                    'underscore.string': '../application/jam/underscore.string/lib/underscore.string',
                    backbone:            '../application/jam/backbone/backbone',
                    transparency:        '../application/jam/transparency/lib/transparency',
                    keymaster:           '../application/jam/keymaster/keymaster',
                    jqueryExtension:     '../application/lib/flexpaper/js/jquery.extensions.min',
                    models:              '../application/models',
                    collections:         '../application/collections',
                    templates:           '../application/templates',
                    views:               '../application/views',
                    features:            '../application/features',
                    tools:               '../application/tools',
                    config:              'config'
                },
                pragmas: {
                    doExclude: true
                },
                skipModuleInsertion: false,
                optimizeAllPluginResources: true,
                findNestedDependencies: true
            },
            release: {
                almond: true,
                replaceRequireScript: [{
                    files: ['release/index.html'],
                    module: 'main'
                }],
                modules: [{name: 'application'}],
                dir: 'release',
                appDir: 'application',
                baseUrl: './',
                shim: {
                    'backbone': {
                        deps: ['underscore', 'jquery'],
                        exports: 'Backbone'
                    },
                    'keymaster': {
                        exports: 'key'
                    },
                    'bootstrap-button': {
                        deps: ['bootstrap']
                    },
                    'bootstrap-modal': {
                        deps: ['bootstrap']
                    },
                    'bootstrap-alert': {
                        deps: ['bootstrap']
                    },
                    'bootstrap': {
                        deps: ['bootstrap-button','bootstrap-modal','bootstrap-alert']
                    }
                },
                paths: {
                    domReady:            'jam/domReady/domReady',
                    jquery:              'jam/jquery/jquery',
                    underscore:          'jam/underscore/underscore',
                    'underscore.string': 'jam/underscore.string/lib/underscore.string',
                    backbone:            'jam/backbone/backbone',
                    transparency:        'jam/transparency/lib/transparency',
                    bootstrap:           'jam/bootstrap/main',
                    'bootstrap-button':  '../application/jam/bootstrap/js/bootstrap-button',
                    'bootstrap-alert':   '../application/jam/bootstrap/js/bootstrap-alert',
                    'bootstrap-modal':   '../application/jam/bootstrap/js/bootstrap-modal',
                    keymaster:           'jam/keymaster/keymaster',
                    models:              'models',
                    collections:         'collections',
                    templates:           'templates',
                    views:               'views',
                    features:            'features',
                    tools:               'tools',
                    config:              'config'
                },
                pragmas: {
                    doExclude: true
                },
                skipModuleInsertion: false,
                optimizeAllPluginResources: true,
                findNestedDependencies: true
            }
        },
        clean: {
            folder: "test-build"
        },
        concat: {
            dist: {
                src: [
                    'application/templates/**/!(all)*.html',
                    'application/features/**/*.html'
                ],
                dest: 'application/templates/all.html',
                separator: '\n\n'
            }
        },
        bunyip: {
            phantom: {
                waitBrowsersFor: 3000,
                args: [
                    '-f',
                    'test-build/test.html',
                    'local',
                    '-l',
                    '"phantomjs"'
                ],
                timeout: 30000
            },
            all: {
                waitBrowsersFor: 6000,
                args: [
                    '-f',
                    'test-build/test.html',
                    'local',
                    '-l',
                    '"firefox|chrome|safari|phantomjs"'
                ],
                timeout: 30000
            }
        },
        mocha: {
            index: ['test-build/test.html']
        },
        remover: {
            cleanRelease: [
                'release/collections',
                'release/features',
                'release/jam',
                'release/less',
                'release/models',
                'release/templates',
                'release/tools',
                'release/views',
                'release/collections.js',
                'release/features.js',
                'release/build.txt',
                'release/config.js',
                'release/debug.js',
                'release/models.js',
                'release/tools.js',
                'release/views.js'
            ]
        },
        config: {
            shared: {
                AJAXCACHE: false,
                TEMPLATE_STORAGE_PATH: 'templates/all.html',
                PATHS: {
                    DATA: '/data.json'
                }
            },
            dev: {
                shared: '<config:config.shared>',
                options: {
                    EVENTS: false,
                    SET_IMMEDIATE: true,
                    DEBUG: true,
                    HOST: 'http://127.0.0.1:8080'
                }
            },
            ci: {
                shared: '<config:config.shared>',
                options: {
                    EVENTS: true,
                    SET_IMMEDIATE: true,
                    DEBUG: true,
                    HOST: 'http://nnn.nnn.nnn.nnn:xxxx'
                }
            },
            qa: {
                shared: '<config:config.shared>',
                options: {
                    EVENTS: false,
                    SET_IMMEDIATE: false,
                    DEBUG: false,
                    HOST: 'http://nnn.nnn.nnn.nnn:xxxx'
                }
            },
            prod: {
                shared: '<config:config.shared>',
                options: {
                    EVENTS: false,
                    SET_IMMEDIATE: false,
                    DEBUG: false,
                    HOST: 'http://nnn.nnn.nnn.nnn:xxxx'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-clean');
    grunt.loadNpmTasks('grunt-recess');
    grunt.loadNpmTasks('grunt-requirejs');
    grunt.loadNpmTasks('grunt-bunyip');
    grunt.loadNpmTasks('grunt-mocha');

    grunt.loadTasks('tasks/remover');
    grunt.loadTasks('tasks/config');

    grunt.registerTask('testbuild', 'clean regen requirejs:test');
    grunt.registerTask('test', 'testbuild mocha');
    grunt.registerTask('bunyiptest', 'testbuild bunyip:phantom clean');

    grunt.registerTask('feature', 'init:feature init:regenerate-features init:regenerate-tests init:regenerate-less init:regenerate-templates regen');
    grunt.registerTask('visibleFeature', 'init:visibleFeature init:regenerate-features init:regenerate-tests init:regenerate-less init:regenerate-templates regen');
    grunt.registerTask('regen', 'config:dev init:regenerate-features init:regenerate-models init:regenerate-collections init:regenerate-tests init:regenerate-tools init:regenerate-less init:regenerate-templates');

    grunt.registerTask('release', 'regen init:regenerate-release requirejs:release recess:release regen remover:cleanRelease');

    grunt.registerTask('default', 'regen lint bunyiptest release');

};
