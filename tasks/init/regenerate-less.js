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
exports.description = 'Reconstructs main LESS';

// The actual init template.
exports.template = function(grunt, init, done) {

    // Files to copy (and process).
    var files = init.filesToCopy(),
        lessDefinition = {},
        ieDefinition = {},
        less = [],
        ie = [];

    for (key in files) {
        if(key === 'main.less') {
            lessDefinition["application/less/main.less"] = files[key];
            continue;
        } else if (key === 'ie.less') {
            ieDefinition["application/less/ie.less"] = files[key];
        }
    }

    // Reconstruct features definition
    files = wrench.readdirSyncRecursive("application/features/");

    files.forEach(function(filename) {
        var extension = filename.substr(-5);
        if(extension === '.less') {
            less.push('@import "../features/' + filename + '";');
        }
    });

    init.copyAndProcess(lessDefinition, {
        featureImports: less.join("\n")
    });

    // Reconstruct IE7 features definition
    files.forEach(function(filename) {
        var extension = filename.substr(-8);
        if(extension === '.less-ie') {
            ie.push('@import "../features/' + filename + '";');
        }
    });

    init.copyAndProcess(ieDefinition, {
        featureImports: ie.join("\n")
    });

    // All done!
    done();
};
