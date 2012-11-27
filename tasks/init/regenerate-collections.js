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
exports.description = 'Reconstructs collection definitions for RequireJS';

// The actual init template.
exports.template = function(grunt, init, done) {

    // Files to copy (and process).
    var files = init.filesToCopy(),
        collectionsDefinition = {},
        collections = [];

    for (key in files) {
        if(key === 'collections.js') {
            collectionsDefinition["application/collections.js"] = files[key];
            continue;
        }
    }

    // Reconstruct collections definition
    files = wrench.readdirSyncRecursive("application/collections/");

    files.forEach(function(filename) {
        var extension = filename.substr(-3);
        if(extension === '.js') {
            collections.push('"collections/' + filename.substr(0, filename.indexOf(extension)) + '"');
        }
    });

    init.copyAndProcess(collectionsDefinition, {
        collections: collections.join(",\n    ")
    });

    // All done!
    done();
};