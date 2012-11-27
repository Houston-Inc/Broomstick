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
exports.description = 'Reconstructs specs definitions for RequireJS';

// The actual init template.
exports.template = function(grunt, init, done) {

    // Files to copy (and process).
    var files = init.filesToCopy(),
        featuresDefinition = {},
        features = [];

    for (key in files) {
        if(key === 'specs.js') {
            featuresDefinition["tests/specs.js"] = files[key];
            continue;
        }
    }

    // Reconstruct specs definition
    files = loadFiles('tests/test/features/');

    files.forEach(function(filename) {
        var extension = filename.substr(-3);
        if(extension === '.js') {
            features.push('"test/features/' + filename.substr(0, filename.indexOf(extension)) + '"');
        }
    });

    files = loadFiles('tests/test/tools/');

    files.forEach(function(filename) {
        var extension = filename.substr(-3);
        if(extension === '.js') {
            features.push('"test/tools/' + filename.substr(0, filename.indexOf(extension)) + '"');
        }
    });

    files = loadFiles('tests/test/collections/');

    files.forEach(function(filename) {
        var extension = filename.substr(-3);
        if(extension === '.js') {
            features.push('"test/collections/' + filename.substr(0, filename.indexOf(extension)) + '"');
        }
    });

    files = loadFiles('tests/test/models/');

    files.forEach(function(filename) {
        var extension = filename.substr(-3);
        if(extension === '.js') {
            features.push('"test/models/' + filename.substr(0, filename.indexOf(extension)) + '"');
        }
    });

    init.copyAndProcess(featuresDefinition, {
        features: features.join(",\n    ")
    });

    // All done!
    done();
};

function loadFiles(path) {
    var exist = fs.existsSync(path);

    if(!exist) {
        return [];
    }

    return wrench.readdirSyncRecursive(path);
}
