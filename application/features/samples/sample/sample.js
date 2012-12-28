define([
    'jquery',
    'backbone',
    'features/VisibleFeature',
    'features/featureContainer',
    'features/section/section',
    'features/samples/hello/hello'
], function($,
            Backbone,
            VisibleFeature,
            FeatureContainer,
            Section,
            HelloFeature,
            undefined) {
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

            self.when(self.templatesResolved(), function() {
                var section = new Section({
                    id: 'sample-section',
                    renderTo: self.element,
                    noScroll: true
                }),
                    hello = new HelloFeature('hello', 'sample-section');

                self.section = section;
                self.registerFeature(section);

                section.registerFeature(hello);

                self.$template = self.getTemplate(self.element);
                self.resolve(true);
            });

            self.publish('router.registerRoutes', self);
            self.publish('moduleInitialized', self);
        },

        render: function() {
            // var self = this;
            // No need to render here, child features will do that!
        },

        activated: function(featureActivated) {
            this.featureActivated.call(this, featureActivated);
        }

    });

    return SampleFeature;

});
