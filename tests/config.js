define("config", function() {
    "use strict";

    var CI = 'http://nnn.nnn.nnn.nnn:xxxx',
        QA = 'http://nnn.nnn.nnn.nnn:xxxx',
        PR = 'http://nnn.nnn.nnn.nnn:xxxx',
        LOCALHOST =  'http://127.0.0.1:8080';

    var config = {
        DEBUG: true,
        AJAXCACHE: false,
        HOST: CI,
        SET_IMMEDIATE: false,
        TEMPLATE_STORAGE_PATH: '../application/templates/all.html',
        PATHS: {
            // JSONP path
            //DATA: 'data.json?callback=?',
            // JSON path
            DATA: 'data.json'
        }
    };

    return config;
});