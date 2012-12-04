define([
    'jquery',
    'underscore',
    'backbone',
    'features/VisibleFeature',
    'features/featureContainer'
], function($, _, Backbone, VisibleFeature, FeatureContainer, undefined) {
    "use strict";

    // Column Feature
    // --------------

    var ColumnFeature = VisibleFeature.extend({

        name: 'ColumnFeature',
        element: 'div#main',
        globalEvents: {
            'module.setCurrentColumn': 'setCurrentColumn',
            'navigation.activeFeatureSet': 'setActiveFeature'
        },

        initialize: function() {
            var self = this;

            self.loaded = $.Deferred();

            self.features = new FeatureContainer();
            self.columns = [];

            self.features.on('add', self.featureAdded, self);

            self.when(self.templatesResolved(), function() {
                self.$template = self.getTemplate(self.element);
                self.resolve(true);
            });

            self.currentColumn = undefined;

        },

        featureAdded: function(feature, features) {
            var self = this;

            self.asyncRender();

            if(self.currentColumn === undefined) {
                self.setCurrentColumn(1);
            }

            self.columns.push('column' + features.length);
            self.publish('module.addedFeature', feature);
        },

        clear: function() {
            this.features.removeAll();
        },

        setActiveFeature: function(activeFeature) {
            this.setCurrentColumn(activeFeature.column);
        },

        findColumn: function(columnNumber) {
            return $("ul#columns").find("[data-column='" + columnNumber + "']");
        },

        setCurrentColumn: function(element) {
            var $column = _.isNumber(element) ? this.findColumn(element) : $(element),
                $columns = $("ul#columns");

            this.currentColumn = $column.attr('data-column');

            $columns.removeClass(this.columns.join(' '));
            $columns.addClass('column' + this.currentColumn);

            return this.currentColumn;
        },

        asyncRender: function() {
            var self = this;

            if(self.isRendered()) {
                self.render();
            }
        },

        render: function() {
            console.log("-- Column Render");
            var self = this,
                directives = {
                    feature: {
                        'id': function() {
                            return this.name;
                        },
                        'data-column': function(params) {
                            return params.index+1;
                        }
                    }
                };

            self.$template.render(self.features.getAll(), directives);

            if(!self.isRendered()) {
                self.setElement(self.element);
                self.$el.append(self.$template);
                self.setRendered(true);
            }
        }

    });

    return ColumnFeature;

});
