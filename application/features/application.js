define([
    'jquery',
    'underscore',
    'backbone',
    'features/VisibleFeature',
    'features/featureContainer',
    'features/ajaxError',
    'features/utils/toaster/toaster',
    'features/windowEventDispatcher',
    'features/viewportController',
    'features/keymaster/keymaster',
    'features/router/router',
    'features/router/notFound/notFound',
    'features/navigation/navigation',
    'features/column/column',
    'features/samples/sample/sample',
    'features/samples/sample2/sample2'
], function($,
            _,
            Backbone,
            VisibleFeature,
            FeatureContainer,
            AjaxError,
            Toaster,
            WindowEventDispatcher,
            ViewportController,
            KeyMaster,
            Router,
            NotFound,
            Navigation,
            Column,
            Sample,
            Sample2,
            undefined) {
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

                self.registerFeature(new AjaxError);
                self.registerFeature(new Toaster);
                self.registerFeature(new WindowEventDispatcher);
                self.registerFeature(new ViewportController);
                self.registerFeature(new KeyMaster);
                self.registerFeature(new Router);
                self.registerFeature(new NotFound);
                self.registerFeature(new Navigation);

                column = self.registerFeature(new Column);
                column.registerFeature(new Sample);
                column.registerFeature(new Sample2);

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
