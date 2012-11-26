define("debug", function(location, io) {
    "use strict";
    var socket,
        server = location.hostname,
        port = 3000,
        connect = function(server, port) {
            socket = io.connect('http://' + server + ':' + port);
        },
        log = function() {
            var n = arguments.length;
            for(var i = 0; i < n; i++) {
                socket.emit('log', arguments[i]);
            }

        };

    connect(server, port);

    return {
        log: log
    };
});
