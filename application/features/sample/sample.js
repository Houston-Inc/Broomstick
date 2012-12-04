define([
    'jquery',
    'backbone',
    'features/VisibleFeature',
    'features/featureContainer'
], function($, Backbone, VisibleFeature, FeatureContainer, undefined) {
    "use strict";

    // Sample Feature
    // ---------------

    var SampleFeature = VisibleFeature.extend({

        name: 'SampleFeature',
        uiName: 'Sample',
        element: 'li#SampleFeature',

        globalEvents: {
            'navigation.activeFeatureSet': 'activated'
        },
        routes: {
            'sample': 'render'
        },

        initialize: function() {
            var self = this;

            self.features = new FeatureContainer();

            self.loaded = $.Deferred();

            self.when(self.templatesResolved(),function() {

                var Section = self.getFeature('SectionFeature'),
                    section = new Section("sample-section", self.element, true);

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
            this.featureActivated.call(featureActivated);
        }

    });

    return SampleFeature;

});
