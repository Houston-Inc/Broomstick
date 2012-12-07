define([
    'jquery',
    'backbone',
    'underscore',
    'features/VisibleFeature',
    'features/featureContainer'
], function($, Backbone, _,  VisibleFeature, FeatureContainer, undefined) {
    "use strict";

    // Hello Feature
    // ------------------------------

    var HelloFeature = VisibleFeature.extend({

        name: 'HelloFeature',
        element: '#hello',

        initialize: function(id, sectionId) {
            var self = this;

            self.loaded = $.Deferred();

            if(!_.isString(id)) {
                throw new Error(self.name + ": Constructor expects id (String)");
            }

            self.id = id;
            self.sectionId = sectionId;

            self.when(self.templatesResolved(),function() {
                self.$template = self.getTemplate(self.element);
                self.resolve(true);
            });

        },

        render: function() {
          var self = this;

            if(!self.isRendered()) {
                self.setElement(self.join("#", self.id));
                self.$el.append(self.$template);
                self.setRendered(true);
            }

            // Basic transparency usage
            var data = {
                name: $.browser.version
            };

            self.$el.render(data);
        }

    });

    return HelloFeature;

});
