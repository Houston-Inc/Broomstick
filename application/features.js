/*
 *  WARNING, DO NOT EDIT: THIS IS AUTOGENERATED BY GRUNT!
 */
define('features', [
    'underscore',
    "features/ajaxError",
    "features/application",
    "features/baseFeature",
    "features/featureContainer",
    "features/viewportController",
    "features/VisibleFeature",
    "features/windowEventDispatcher",
    "features/accordion/accordion",
    "features/column/column",
    "features/keymaster/KeyMaster",
    "features/navigation/navigation",
    "features/router/router",
    "features/router/notFound/notFound",
    "features/sample/sample",
    "features/section/section",
    "features/utils/loading/loading",
    "features/utils/toaster/toaster"
], function(_) {
    "use strict";

    var key, features = {}, deferreds = [];
    _.each(arguments, function(value, key, list) {
        if(!!list[key].prototype.name) {
            features[list[key].prototype.name] = value;
        }
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
