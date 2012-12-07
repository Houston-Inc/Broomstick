define([
    'jquery',
    'underscore',
    'backbone',
    'features/baseFeature',
    'features/featureContainer'
], function($, _, Backbone, BaseFeature, FeatureContainer, undefined) {
    "use strict";

    // {%= capitalizedName %} Feature
    // ------------------------------

    var {%= capitalizedName %}Feature = BaseFeature.extend({
        name: '{%= capitalizedName %}Feature',
        globalEvents: {
            'eventName': 'eventHandler'
        },

        initialize: function() {
            var self = this;

            self.loaded = $.Deferred();
            self.resolve(true);
        },

        eventHandler: function(eventData) {
			// doMagicOnEventTriggered
        }
    });

    return {%= capitalizedName %}Feature;

});
