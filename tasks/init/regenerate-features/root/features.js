/*
 *  WARNING, DO NOT EDIT: THIS IS AUTOGENERATED BY GRUNT!
 */
define('features', [
    'underscore',
    {%=features%}
], function(_) {
    "use strict";

    var key, features = {}, deferreds = [];
    _.each(arguments, function(value, key, list) {
        if(value !== _ && !value && value.prototype.name) {
            throw new Error('All features have to have a name!');
        }
        features[value.prototype.name] = value;
    });

    return {
        get: function(feature) {
            if(_.has(features, feature)) {
                return features[feature];
            } else {
                throw new Error("Feature " + feature + " not found");
            }
        },
        getList: function() {
            return _.keys(features);
        }
    };
});
