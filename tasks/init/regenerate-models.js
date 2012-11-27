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
exports.description = 'Reconstructs model definitions for RequireJS';

// The actual init template.
exports.template = function(grunt, init, done) {

    // Files to copy (and process).
    var files = init.filesToCopy(),
        modelsDefinition = {},
        models = [],
        filePath = 'application/models/';

    console.log(path);

    for (key in files) {
        if(key === 'models.js') {
            modelsDefinition["application/models.js"] = files[key];
            continue;
        }
    }

    // Reconstruct models definition
    files = wrench.readdirSyncRecursive(filePath);

    files.forEach(function(filename) {
        var extension = filename.substr(-3);
        if(extension === '.js') {
            models.push('"models/' + filename.substr(0, filename.indexOf(extension)) + '"');
        }
    });

    init.copyAndProcess(modelsDefinition, {
        models: models.join(",\n    ")
    });

    // All done!
    done();
};