var fs = require('fs');

function readData(to, from, path, exclude, log) {
    exclude = exclude || function() { return false; };
    from.forEach(function(filename) {
        if(!exclude(filename, extension(filename))) {
            if(log) {
                log(filename);
            }
            filename = path + filename;
            var data = removeWhitespace(fs.readFileSync(filename,'utf-8'));
            to.push(data);
        }
    });
    return to;
}

function extension(filename) {
    var extension = "";
    for(var i=filename.length-1; i >= 0; i--) {
        if(filename[i] === '.') {
            extension = filename.substr((filename.length - i) * -1);
            break;
        }
    }
    return extension;
}

function removeWhitespace(data) {
    return data.replace(/(\r\n|\n|\r)/gm,"").replace(/>\s+</g, '><').replace(/\s+/g, ' ');
}

exports.readData = readData;
