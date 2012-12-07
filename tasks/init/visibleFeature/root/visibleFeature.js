define([
    'jquery',
    'underscore',
    'backbone',
    'features/VisibleFeature',
    'features/featureContainer'
], function($, _, Backbone, VisibleFeature, FeatureContainer, undefined) {
    "use strict";

    // {%= capitalizedName %} Feature
    // ------------------------------

    var {%= capitalizedName %}Feature = VisibleFeature.extend({

        name: '{%= capitalizedName %}Feature',
        uiName: '{%= capitalizedName %}',
        element: '#{%= dashNotatedName %}',
        globalEvents: {
            'eventName': 'eventHandler'
        },

        initialize: function() {
            var self = this;

            self.loaded = $.Deferred();

            self.features = new FeatureContainer();

            self.features.on('add', self.asyncRender, self);

            self.when(self.templatesResolved(),function() {
              self.$template = self.getTemplate(self.element);
              self.resolve(true);
            });

        },

        eventHandler: function(eventData) {
			// doMagicOnEventTriggered
        },

        // Rendering

        build: function(data) {
            var self = this;

            self.features.each(function(feature) {
                data.push({
                   dataObject: feature.uiName,
                   id: feature.id
                });
            });
        },

        asyncRender: function() {
            var self = this;

            if(self.isRendered()) {
                self.render();
            }
        },

        render: function() {
            var self = this,
                data = [],
                directives = {
                    dataObject: {
                        'id': function() {
                            return this.id;
                        }
                    }
                };

            self.build(data);

            self.$template.render(data, directives);

            if(!self.isRendered()) {
                self.setElement(self.element);
                self.$el.append(self.$template);
                self.setRendered(true);
            }

        },

        render: function() {
            var self = this;

            if(!self.isRendered()) {
                self.setElement(self.element);
                self.$el.append(self.$template);
                self.setRendered(true);
            }
        }

    });

    return {%= capitalizedName %}Feature;

});
