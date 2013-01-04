define([
    'jquery',
    'underscore',
    'backbone',
    'features/VisibleFeature',
    'features/featureContainer'
], function($, _, Backbone, VisibleFeature, FeatureContainer, undefined) {
    "use strict";

    // Acco Feature
    // ------------------------------

    var AccoFeature = VisibleFeature.extend({

        name: 'AccoFeature',
        uiName: 'Acco 1',
        element: '#acco',

        initialize: function(options) {
            var self = this,
                renderToId = options.renderToId;

            if(!_.isString(renderToId)) {
                throw new Error(this.name + ": Constructor expects id (String)");
            }

            this.id = renderToId;

            this.loaded = $.Deferred();

            this.when(this.templatesResolved(), function() {
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

    return AccoFeature;

});
