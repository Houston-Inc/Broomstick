define(['jquery', 'features/baseFeature', 'keymaster', 'underscore'], function($, BaseFeature, key, _, undefined) {
    "use strict";

    // KeyMaster Feature
    // _______

    var KeyMasterFeature = BaseFeature.extend({
        name: 'KeyMasterFeature',

        globalEvents: {
            'keys.registerKeyEvents': 'registerKeyEvents',
            'keys.setScope': 'setScope'
        },

        _renderable: false,

        initialize: function() {
            this.loaded = $.Deferred();
            this.resolve();
        },
        registerKeyEvents: function(feature) {
            var keyEvents = feature.keyEvents;
            _.each(keyEvents, function(value, k, object) {
                var handler = function() {
                    feature[value.handler](value.key);
                };

                if(value.scope) {
                    key(value.key, value.scope, handler);
                }
                else {
                    key(value.key, handler);
                }
            });
        },
        setScope: function(scope) {
            key.setScope(scope);
            this.publish('keys.scopeSet', scope);
        }
        /*clear: funtion() {

        };*/
    });

    return KeyMasterFeature;

});
