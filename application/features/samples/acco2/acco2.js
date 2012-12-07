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

        initialize: function(renderToID) {
            var self = this;

            if(!_.isString(renderToID)) {
                throw new Error(self.name + ": Constructor expects id (String)");
            }

            self.id = renderToID;

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
