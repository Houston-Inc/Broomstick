define(['backbone', 'tools/eventmachine'], function(Backbone, eventMachine) {
    "use strict";
    
    // Aggregation Model
    // -----------

    var Aggregation = Backbone.Model.extend({
        name: 'Aggregation',

        initialize: function(data) {
            var self = this;
        }

    });
    
    return Aggregation;

});