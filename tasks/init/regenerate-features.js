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
    wrench  = require("wrench");

// Basic template description.
exports.description = 'Reconstructs feature definitions for RequireJS';

// The actual init template.
exports.template = function(grunt, init, done) {

    // Files to copy (and process).
    var files = init.filesToCopy(),
        featuresDefinition = {},
        features = [];

    for (key in files) {
        if(key === 'features.js') {
            featuresDefinition["application/features.js"] = files[key];
            continue;
        }
    }

    // Reconstruct features definition
    files = wrench.readdirSyncRecursive("application/features/");

    files.forEach(function(filename) {
        var extension = filename.substr(-3);
        if(extension === '.js') {
            features.push('"features/' + filename.substr(0, filename.indexOf(extension)) + '"');
        }
    });

    init.copyAndProcess(featuresDefinition, {
        features: features.join(",\n    ")
    });

    // All done!
    done();
};