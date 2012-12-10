module.exports = function(grunt) {
    var fs = require('fs'),
        wrench = require('wrench');

    grunt.registerMultiTask('remover', 'Removes given files and directories', function() {
        if (!this.data) { return false; }

        if (this.data instanceof Array) {
            this.data.forEach(function(path) {
                if(fs.existsSync(path)) {
                    try {
                        var stats = fs.lstatSync(path);

                        if (stats.isDirectory()) {
                            wrench.rmdirSyncRecursive(path);
                            grunt.log.writeln("Removed folder " + path);
                        } else {
                            fs.unlinkSync(path);
                            grunt.log.writeln("Removed file " + path);
                        }
                    } catch (er) {
                        grunt.log.writeln("Failed to read stats from path");
                        throw er;
                    }
                }
            });
        }
    });
};