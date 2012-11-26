define("collections", [
    'underscore',
    'collections/aggregations'
], function(_) {
    "use strict";
    var key, collections = {};

    _.each(arguments, function(value, key, list) {
        collections[list[key].prototype.name] = list[key];
    });

    return {
        get: function(name) {
            if(name in collections) {
                return collections[name];
            }
        }
    };
});
