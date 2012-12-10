define(['backbone', 'tools/eventmachine'], function(Backbone, eventMachine) {
    "use strict";
    
    // Data Model
    // -----------

    var Data = Backbone.Model.extend({
        name: 'Data',

        initialize: function(data) {
            var self = this;
        }

    });
    
    return Data;

});