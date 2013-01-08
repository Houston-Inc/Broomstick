module.exports = function(grunt) {
    var fs = require('fs'),
        wrench = require('wrench');

    grunt.registerMultiTask('config', '(re)generates config file', function() {
        if (!this.data && !this.data.shared && !this.data.options) { return false; }

        var filePath = 'application/config.js',
            template = grunt.task.expand('config/root/template.js')[0],
            data = fs.readFileSync(template.abs, 'utf-8'),
            opts = grunt.utils._.extend(this.data.shared, this.data.options);
    
        var out = JSON.stringify(opts, null, '    ');
        out = out.replace(/\s{4}\"/g,'        "');
        out = out.replace(/\}/g,'    }');

        var outData = grunt.template.process(data, {
            config: out
        });

        fs.writeFileSync(filePath, outData, 'utf-8');
    });
};