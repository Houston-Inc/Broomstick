/*globals navigator*/
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

        initialize: function(options) {
            var self = this,
                id = options.renderToId,
                sectionId = options.sectionId;

            this.loaded = $.Deferred();

            if(!_.isString(id)) {
                throw new Error(this.name + ": Constructor expects options.renderToId (String)");
            }

            this.id = id;
            this.sectionId = sectionId;

            this.when(this.templatesResolved(), function() {
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
                name: navigator.userAgent
            };

            self.$el.render(data);
        }

    });

    return HelloFeature;

});
