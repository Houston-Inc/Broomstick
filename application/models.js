define("models", [
    'underscore',
    'models/aggregation'
], function(_) {
    "use strict";

    var key, models = {};

    _.each(arguments, function(value, key, list) {
        models[list[key].prototype.name] = list[key];
    });

    return {
        get: function(name) {
            if(name in models) {
                return models[name];
            }
        }
    };

});
