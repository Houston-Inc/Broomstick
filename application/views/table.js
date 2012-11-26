define(['jquery', 'underscore', 'backbone', 'tools'], function($, _, Backbone, tools) {
    "use strict";

    // Table View
    // ----------

    var TableView = Backbone.View.extend({

        name: 'TableView',
        loaded: $.Deferred(),
        templateId: '.table',

        events: {
            "click td"   : "tableDataHandler"
        },

        initialize: function() {
            var self = this;

            $.when(tools.templateStorage.isResolved()).done(function() {
                self.$table = tools.templateStorage.get(self.templateId, true);
                self.resolve(true);
            });
        },

        render: function(target, data, directives, callback) {
            var self = this,
                $target = $(target);
            self.setElement(target);

            self.$table.render(data, directives);
            $target.html(self.$table);

            if (_.isFunction(callback)) {
                callback(self.$table);
            }
        },

        resolve: function(value) {
            this.loaded.resolve(value);
        },

        isResolved: function() {
            return this.loaded;
        },

        tableDataHandler: function(event) {
        }
    });

    return TableView;

});