/*
 * grunt
 * https://github.com/cowboy/grunt
 *
 * Copyright (c) 2012 "Cowboy" Ben Alman
 * Licensed under the MIT license.
 * http://benalman.com/about/license/
 */

var path    = require('path'),
    fs      = require('fs');

var superlatives = ['amazing', 'wonderful', 'killer', 'awesome', 'superb', 'fantastic'],
    which = ['String', 'Array', 'Object', 'People', 'Microwave', 'Pulse', 'Plasma'],
    what = ['Feature', 'Tool', 'Converter', 'Analyzer', 'Weapon', 'Destructor', 'Creator'],
    prompts = {
        name: {
            message: 'Feature name',
            default: function(value, data, done) {
                var name = superlatives[Math.floor(Math.random() * superlatives.length)];
                name += which[Math.floor(Math.random() * which.length)];
                name += what[Math.floor(Math.random() * what.length)];
                done(null, name);
            },
            validator: /^[\w\-\.]+$/,
            warning: 'Must be only letters, numbers, dashes or dots.',
            sanitize: function(value, data, done) {
                // An additional value, safe to use as a JavaScript identifier.
                data.capitalizedName = value.charAt(0).toUpperCase() + value.slice(1);
                data.dashNotatedName = value.replace(/([A-Z])/g, function($1){return "-"+$1.toLowerCase();});
                // If no value is passed to `done`, the original property isn't modified.
                done();
            }
        },
        path: {
            message: 'Feature path (application/features/)',
            default: function(value, data, done) {
                done(null, "");
            },
            validator: /^[\w\/]+$/,
            warning: 'Must be only letters, numbers, underscores or forward slashes',
            sanitize: function(value, data, done) {
                var directory = "application/features/" + value,
                    testDirectory = "tests/test/features/" + value,
                    mochaTestPath = "features/" + value;
                data.mochaTestPath = mochaTestPath;
                data.testDirectory = testDirectory;
                data.pathName = testDirectory+data.name;
                done(null, directory);
            }
        }
    };

// Basic template description.
exports.description = 'Create a feature, including Mocha BDD tests.';

// Template-specific notes to be displayed before question prompts.
exports.notes = '_Feature name_ should not contain spaces (" ") or "js" and ' +
  'should be a unique name not already in use at application/features/. User CamelCase notation for naming, ' +
  'see: http://en.wikipedia.org/wiki/CamelCase where the first letter is lowercase i.e. camelCase';

// Any existing file or directory matching this wildcard will cause a warning.
//exports.warnOn = '*';

// The actual init template.
exports.template = function(grunt, init, done) {

    grunt.registerHelper('prompt_feature', function(name) {

        // Clone the option so the original options object doesn't get modified.
        var option = grunt.utils._.clone(prompts[name]);
        option.name = name;

        return option;

    });

    grunt.helper('prompt', {type: 'feature'}, [
        // Prompt for these values.
        grunt.helper('prompt_feature', 'name'),
        grunt.helper('prompt_feature', 'path')
    ], function(err, props) {

        // Files to copy (and process).
        var files = init.filesToCopy(props),
            fixedFiles = {};

        for (key in files) {
            if(/.svn/.test(files[key])) continue;
            var template = files[key],
                extension = key.split(".")[1],
                directory = props.path;

            if(path.basename(files[key]) == 'test.js') {
                fixedFile =  props.testDirectory + "/" + props.name + "." + extension;
                props.pathName = directory + "/" + props.name;
                props.testPathName = props.mochaTestPath + "/" + props.name;
            } else {
                fixedFile =  directory + "/" + props.name + "." + extension;
            }

            if(fs.existsSync(fixedFile)) {
                grunt.fail.fatal("File " + fixedFile + " already exists!");
            }

            fixedFiles[fixedFile] = template;
        }
        // Actually copy (and process) files.
        init.copyAndProcess(fixedFiles, props);

        // All done!
        done();
    });
};