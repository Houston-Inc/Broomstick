define([
    'jquery',
    'underscore',
    'backbone',
    'features/VisibleFeature',
    'features/featureContainer'
], function($, _, Backbone, VisibleFeature, FeatureContainer, undefined) {
    "use strict";

    // Application Feature
    // -------------------

    var ApplicationFeature = VisibleFeature.extend({

        name: 'ApplicationFeature',
        el: 'body',
        globalEvents: {
            'featureResolved' : 'featureResolved'
        },
        templateId: '#broomstick',

        initialize: function() {
            var self = this;

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
                column.registerFeature('Sample2Feature');

                self.when(self.features.isResolved(), function() {
                    if(self.getConfig('DEBUG')) {
                        console.log("All features resolved");
                    }
                    self.resolve(true);
                });
            });
        },

        render: function() {
            if(this.getConfig('DEBUG')) {
                console.log("-- Application render");
            }
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
                    if(self.getConfig('DEBUG')) {
                        console.log("   -- Rendering ", feature.name, feature.features);
                    }
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
