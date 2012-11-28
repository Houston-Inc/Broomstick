define([
    'jquery',
    'backbone',
    'models/aggregation',
    'config',
    'tools/eventmachine'
], function($, Backbone, Aggregation, config, eventMachine) {
    "use strict";
    
    // Aggregations Collection
    // ---------------
    var Aggregations = Backbone.Collection.extend({

        name: "Aggregations",
        // Reference to this collection's model.
        model: Aggregation,
        url: config.HOST + config.PATHS.AGGREGATE,
        count: 0,
        loaded: $.Deferred(),

        initialize: function(models, options) {
            var self = this;

            self.on("reset", function() {
                eventMachine.publish("AggregationsCollection:AggregationsLoaded", self);
                self.loaded.resolve(true);
            });
        }
    });

    return Aggregations;

});
