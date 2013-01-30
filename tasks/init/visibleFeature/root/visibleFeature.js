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
            'navigation.activeFeatureSet': 'activated'
        },
        routes: {
            '{%= capitalizedName.toLowerCase() %}': 'render'
        },

        initialize: function initialize() {
            var self = this;

            self.loaded = $.Deferred();

            self.features = new FeatureContainer();

            self.features.on('add', self.asyncRender, self);

            self.when(self.templatesResolved(),function() {
              self.$template = self.getTemplate(self.element);
              self.resolve(true);
            });

        },

        render: function render() {
            this.$template.render(data, directives);

            if(!this.isRendered()) {
                this.setElement(this.element);
                this.$el.append(this.$template);
                this.setRendered(true);
            }

        },

        activated: function activated(featureActivated) {
            this.featureActivated.call(this, featureActivated);
        }

    });

    return {%= capitalizedName %}Feature;

});
