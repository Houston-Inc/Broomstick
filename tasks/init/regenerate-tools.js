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
exports.description = 'Reconstructs tools for RequireJS';

// The actual init template.
exports.template = function(grunt, init, done) {

    // Files to copy (and process).
    var files = init.filesToCopy(),
        toolsDefinition = {},
        tools = [],
        filePath = 'application/tools/';

    for (key in files) {
        if(key === 'tools.js') {
            toolsDefinition["application/tools.js"] = files[key];
            continue;
        }
    }

    // Reconstruct tools
    files = loadFiles(filePath);

    files.forEach(function(filename) {
        var extension = filename.substr(-3);
        if(extension === '.js') {
            tools.push('"tools/' + filename.substr(0, filename.indexOf(extension)) + '"');
        }
    });

    init.copyAndProcess(toolsDefinition, {
        tools: tools.join(",\n    ")
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