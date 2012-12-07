define([
    'jquery',
    'backbone',
    'models/data',
    'config',
    'tools/eventmachine'
], function($, Backbone, Data, config, eventMachine) {
    "use strict";
    
    // Datas Collection
    // ---------------
    var Datas = Backbone.Collection.extend({

        name: "Datas",
        // Reference to this collection's model.
        model: Data,
        url: config.HOST + config.PATHS.DATA,
        count: 0,
        loaded: $.Deferred(),

        initialize: function(models, options) {
            var self = this;

            self.on("reset", function() {
                eventMachine.publish("collection.datasLoaded", self);
                self.loaded.resolve(true);
            });
        }
    });

    return Datas;

});
