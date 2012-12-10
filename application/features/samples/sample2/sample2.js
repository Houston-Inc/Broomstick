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
        sectionId: 'sample2-section',

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
            
            var Section = self.getFeature('SectionFeature'),
                section = new Section("sample2-section", self.element, true),
                Accordion = self.getFeature("AccordionFeature"),
                accordion = new Accordion("analyzer-accordion", self.sectionId),
                Acco1 = self.getFeature("AccoFeature"),
                acco1 = new Acco1("acco-content .accordion-inner"),
                Acco2 = self.getFeature("Acco2Feature"),
                acco2 = new Acco2("acco2-content .accordion-inner"),
                JsonFeature = self.getFeature("JsonFeature"),
                jsonFeature = new JsonFeature("json", self.sectionId);

            self.accordion = accordion;
            self.registerFeature(section);

            section.registerFeature(accordion);
            section.registerFeature(jsonFeature);

            accordion.registerFeature(acco1);
            accordion.registerFeature(acco2);

            self.resolve(true);

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

    return Sample2Feature;

});
