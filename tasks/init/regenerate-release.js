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
    readData = require('./regen-template-lib.js').readData;

// Basic template description.
exports.description = 'Reconstructs template structures for html files';

// The actual init template.
exports.template = function(grunt, init, done) {

    // Files to copy (and process).
    var files = init.filesToCopy(),
        templateDefinition = {},
        templates = [];

    for (var key in files) {
        if(key === 'index.html') {
            templateDefinition["application/index.html"] = files[key];
            continue;
        }
    }

    var exclude = function(filename, extension) {
        return extension !== '.html' || filename === 'all.html';
    };

    var log = function(line) {
        grunt.log.writeln(line);
    };

    // Common template files
    files = wrench.readdirSyncRecursive("application/templates/");
    templates = readData(templates,
                         files,
                         process.cwd()+"/application/templates/",
                         exclude,
                         log);

    // Features templates
    files = wrench.readdirSyncRecursive("application/features/");
    templates = readData(templates,
                         files,
                         process.cwd()+"/application/features/",
                         exclude,
                         log);

    init.copyAndProcess(templateDefinition, {
        templateImports: templates.join("\n\n")
    });

    // All done!
    done();
};
