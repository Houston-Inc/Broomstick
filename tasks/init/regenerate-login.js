/*
 * grunt
 * https://github.com/cowboy/grunt
 *
 * Copyright (c) 2012 "Cowboy" Ben Alman
 * Licensed under the MIT license.
 * http://benalman.com/about/license/
 */

var path    = require('path'),
    fs      = require('fs'),
    wrench  = require("wrench"),
    readData = require('./regen-template-lib.js').readData,

    define = function(name, callback) {
        return callback();
    };



// Basic template description.
exports.description = 'Reconstructs login';

// The actual init template.
exports.template = function(grunt, init, done) {


    // Files to copy (and process).
    var files = init.filesToCopy(),
        config = eval(fs.readFileSync("application/config.js", "utf-8")),
        prodDefinition = {},
        templates = [],
        target = grunt.option('deploy') ? grunt.option('deploy') : 'development';

    for (var key in files) {
        if(key === 'login.js') {
            prodDefinition["application/lib/login.js"] = files[key];
            continue;
        }
    }

    init.copyAndProcess(prodDefinition, {
        development: target == 'development' ? true : false,
        baseURL: config.HOST
    });

    // All done!
    done();
};
