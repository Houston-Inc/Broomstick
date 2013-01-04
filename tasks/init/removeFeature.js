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
    wrench  = require('wrench');

var prompts = {
        remove: {
            message: 'Feature number',
            'default': function(value, data, done) {
                done(null, '');
            },
            //validator: /[\d]+/,
            validator: function(value) {
                remind(value);

                var regexp = /[\d]+/g;

                if(regexp.test(value)) {
                    if(value >= 0 && value <= features.length) {
                        return true;
                    }
                }
                return false;
            },
            warning: 'Must give number of the feature to be removed.',
            sanitize: function(value, data, done) {
                done(null, value);
            }
        }
    },
    features = [];

// The actual init template.
exports.template = function(grunt, init, done) {
    var featurePath = 'application/features/',
        testPath = 'tests/test/features/',
        basePath = init.destpath() + '/' + featurePath,
        baseTestPath = init.destpath() + '/' + testPath,
        files,
        index = 0;

    files = wrench.readdirSyncRecursive(featurePath);

    console.log('Command [0]: Cancel removing');
    files.forEach(function(filename) {
        var extension = filename.substr(-3),
            fpath = basePath + filename,
            tpath = baseTestPath + filename;

        if(extension === '.js') {
            var data = fs.readFileSync(fpath, 'utf-8');
            if(data) {
                var namePattern = /name: '(.+)',/g,
                    fname = namePattern.exec(data)[0];

                fname = fname.replace(/[',]/g,'').replace('name: ','');
                if(fname && fname.indexOf('Feature') !== -1) {
                    var deps = [],
                        depsPattern = /define\(\[([\s\S])+\],[\s\n\r]+function/gm,
                        hipsPattern = /('[\w\-\/]+')/g,
                        name = filename.substring(0,(filename.length - 3));

                    deps = data.match(depsPattern).toString().match(hipsPattern);
                    index++;

                    console.log('Feature ['+index+']: '+fname);

                    features.push({
                        fpath: fpath,
                        tpath: tpath,
                        fname: fname,
                        name: name.slice(name.lastIndexOf('/',name)+1,name.length),
                        deps: deps
                    });
                }
            }
        }
    });

    grunt.registerHelper('prompt_feature', function(name) {
        // Clone the option so the original options object doesn't get modified.
        var option = grunt.utils._.clone(prompts[name]);
        option.name = name;

        return option;
    });

    grunt.helper('prompt', {type: 'feature'}, [
        // Prompt for these values.
        grunt.helper('prompt_feature', 'remove')
    ], function(err, props) {
        // 0 exits
        if(props.remove === 0) {
            done();
        }

        features.forEach(function(feature, index) {
            if((index+1) == props.remove) {
                var spath = feature.fpath.split('.')[0],
                    htmlPath = spath + '.html',
                    lessPath = spath + '.less';

                removeIfExist(feature.fpath);
                removeIfExist(htmlPath);
                removeIfExist(lessPath);
                removeIfExist(feature.tpath);

                console.log('removed',feature.fname);

                features.forEach(function(feat, ind) {
                    if(feat.name !== feature.name) {
                        feat.deps.forEach(function(dep, depInd) {
                            if(dep.indexOf(feature.name) !== -1) {
                                var tempData = fs.readFileSync(feat.fpath, 'utf-8'),
                                    oldData = tempData,
                                    f1pattern = /[\],\s]+function\(([\s\S])+\)[\s]+\{[\s\n\r]+"u/gm;
                                    f2pattern = /([\w\$]+[,|\)])/g,
                                    fnames = tempData.match(f1pattern).toString().match(f2pattern),
                                    regexp = new RegExp(dep+',[\n\\s{4}]?[\\s]+');

                                tempData = tempData.replace(regexp, '');
                                regexp = new RegExp(',[\\s\n\r]+'+dep,'gm');
                                tempData = tempData.replace(regexp, '');
                                regexp = new RegExp(fnames[depInd]+'[\n\\s{12}]?[\\s]+');
                                tempData = tempData.replace(regexp, '');
                                regexp = new RegExp(feature.name.capitalize(),'g');
                                tempData = tempData.replace(regexp, 'REMOVEME');

                                fs.writeFileSync(feat.fpath, tempData, 'utf-8');
                                console.log("modified",feat.fname);
                            }
                        });
                    }
                });
            }
        });

        // All done!
        done();
    });
};

function removeIfExist(path) {
    if(fs.existsSync(path)) {
        fs.unlinkSync(path);

        var splitted = path.split('/');
        splitted.pop();

        var spath = splitted.join('/'),
            files = fs.readdirSync(spath);

        if(files.length === 0) {
            wrench.rmdirSyncRecursive(spath);
        }
    }
}

function remind(value) {
    features.forEach(function(feature, index) {
        if((index+1) == value) {
            console.log('You are now removing ' + feature.fname);
            console.log('It is used in these features:');
            features.forEach(function(feat, ind) {
                if(feat.name !== feature.name) {
                    feat.deps.forEach(function(dep) {
                        if(dep.indexOf(feature.name) !== -1) {
                            console.log(feat.fname);
                        }
                    });
                }
            });
        }
    });
}

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};