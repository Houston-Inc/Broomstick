define([
    'jquery',
    'underscore',
    'backbone',
    'features/baseFeature',
    'features/featureContainer'
], function($, _, Backbone, BaseFeature, FeatureContainer, undefined) {
    "use strict";

    // Application Feature
    // -------------------

    var ApplicationFeature = BaseFeature.extend({

        name: 'ApplicationFeature',
        el: 'body',
        globalEvents: {
            'featureResolved'   : 'featureResolved'
        },
        templateId: '#broomstick',

        initialize: function() {
            var self = this;

            self.initializeSubscriptions();
            self.loaded = $.Deferred();
            self.features = new FeatureContainer();

            self.when(self.templatesResolved(), function() {
                var column;

                self.$template = self.getTemplate(self.templateId, true);

                self.registerFeature('AjaxErrorFeature');
                self.registerFeature('ToasterFeature');
                self.registerFeature('WindowEventDispatcherFeature');
                self.registerFeature('ViewportControllerFeature');
                self.registerFeature('KeyMasterFeature');
                self.registerFeature('RouterFeature');
                self.registerFeature('NotFoundFeature');
                self.registerFeature('NavigationFeature');


                column = self.registerFeature('ColumnFeature');
                column.registerFeature('SampleFeature');

                self.when(self.features.isResolved(), function() {
                    console.log("Features Resolved");
                    self.resolve(true);
                });
            });
        },

        render: function() {
            console.log("-- Application render");
            var self = this;

            if(!self.isRendered()) {
                self.$el.append(self.$template);
                self.renderFeatures(self.features);
                self.setRendered(true);
            }
        },

        renderFeatures: function(features) {
            var self = this;
            features.each(function(feature) {
                if(feature.isRenderable()) {
                    console.log("   -- Rendering ", feature.name, feature.features);
                    feature.render();
                    if(feature.features instanceof FeatureContainer && feature.isFeaturesRenderable()) {
                        self.renderFeatures(feature.features);
                    }
                }
            });
        },

        featureResolved: function(feature) {
            var self = this,
                count = 0;

            _.each(self.features.isResolved(), function(deferred, idx) {
                if(deferred.state() === 'resolved') {
                    count++;
                }
            });

            if(self.getConfig("DEBUG")) {
                console.log(feature.name + " loaded: " + count + " / " + self.features.isResolved().length);
            }
        }

    });

    return ApplicationFeature;

});
