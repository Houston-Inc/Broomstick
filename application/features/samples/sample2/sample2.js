define([
    'jquery',
    'backbone',
    'features/VisibleFeature',
    'features/featureContainer'
], function($, Backbone, VisibleFeature, FeatureContainer, undefined) {
    "use strict";

    // Sample 2 Feature
    // ---------------

    var Sample2Feature = VisibleFeature.extend({

        name: 'Sample2Feature',
        uiName: 'Sample 2',
        element: 'li#Sample2Feature',

        globalEvents: {
            'navigation.activeFeatureSet': 'activated'
        },
        routes: {
            'sample-2': 'render'
        },

        initialize: function() {
            var self = this;

            self.features = new FeatureContainer();

            self.loaded = $.Deferred();

            self.when(self.templatesResolved(),function() {

                var Section = self.getFeature('SectionFeature'),
                    section = new Section("sample2-section", self.element, true);

                self.section = section;
                self.registerFeature(section);

                self.$template = self.getTemplate(self.element);
                self.resolve(true);
            });

            self.publish('router.registerRoutes', self);
            self.publish('moduleInitialized', self);
        },

        render: function() {
            var self = this;

            /*if(!self.isRendered()) {
                self.setElement(self.element);
                self.$el.append(self.$template);
                self.setRendered(true);
            }*/
        },

        activated: function(featureActivated) {
            this.featureActivated.call(this, featureActivated);
        }

    });

    return Sample2Feature;

});
