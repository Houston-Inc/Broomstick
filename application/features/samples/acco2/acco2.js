define([
    'jquery',
    'underscore',
    'backbone',
    'features/VisibleFeature',
    'features/featureContainer'
], function($, _, Backbone, VisibleFeature, FeatureContainer, undefined) {
    "use strict";

    // Acco2 Feature
    // ------------------------------

    var Acco2Feature = VisibleFeature.extend({

        name: 'Acco2Feature',
        uiName: 'Acco 2',
        element: '#acco2',

        initialize: function(options) {
            var self = this,
                renderToId = options.renderToId;

            if(!_.isString(renderToId)) {
                throw new Error(self.name + ": Constructor expects options.renderToId (String)");
            }

            self.id = renderToId;

            self.loaded = $.Deferred();

            self.when(self.templatesResolved(),function() {
                self.$template = self.getTemplate(self.element);
                self.resolve(true);
            });

        },

        render: function() {
            var self = this;

            if(!self.isRendered()) {
                self.setElement('#' + self.id);
                self.$el.append(self.$template);
                self.setRendered(true);
            }
        }

    });

    return Acco2Feature;

});
