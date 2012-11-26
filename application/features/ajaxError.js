define([
    'jquery',
    'features/baseFeature'
], function($, BaseFeature, undefined) {
    "use strict";

    // AjaxError Feature
    // -----------------

    var AjaxErrorFeature = BaseFeature.extend({

        name: 'AjaxErrorFeature',

        initialize: function() {
            var self = this;

            self.loaded = $.Deferred();

            self.activate();

            self.resolve(true);

            this.delegateError(null, null, null);
        },

        activate: function() {
            var self = this;
            $.ajaxSetup({
                cache: self.getConfig("AJAXCACHE"),
                statusCode: {
                    401: function(xhr, status, error) {
                        self.delegateError(xhr, status, error);
                    },
                    500: function(xhr, status, error) {
                        self.delegateError(xhr, status, error);
                    }
                }
            });
        },

        delegateError: function(xhr, status, error) {
            var self = this;
            self.publish("ajaxError", {
                data: {
                    xhr: xhr,
                    status: status,
                    error: error
                }
            });
        }
    });

    return AjaxErrorFeature;

});
