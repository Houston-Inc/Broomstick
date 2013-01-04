(function(window) {
    define([
        'jquery',
        'backbone',
        'underscore',
        'features/VisibleFeature',
        'features/featureContainer',
        'bootstrap-modal'
    ], function($, Backbone, _, VisibleFeature, FeatureContainer, btModal, undefined) {
        "use strict";
        // NotFound Feature
        // ------------------------------

        var NotFoundFeature = VisibleFeature.extend({
            name: 'NotFoundFeature',
            element: 'body',
            templateId: '#not-found',
            kittenURL: 'http://placekitten.com/',
            _renderable: false,
            globalEvents: {
                'navigation.activeFeatureSet': 'activated'
            },
            routes: {
                '*notFound': 'notFound'
            },

            initialize: function() {
                var self = this;

                self.loaded = $.Deferred();

                self.when(self.templatesResolved(),function() {
                    self.$template = self.getTemplate(self.templateId);
                    self.resolve(true);
                });

                self.publish('router.registerRoutes', self);
            },

            notFound: function(args, route) {
                if(args && args.length > 0 && args[0] !== '') {
                    this.render();
                    this.$template.parent().modal();
                }
                $('#loading').css({'z-index': 'auto', background: 'none'});
            },

            render: function() {
                var width = ($('body').width() / 2),
                    height = ($('body').height() / 2),
                    kittenURL;

                width = Math.floor(width + (Math.random()*(width * 0.2)+1));
                height = Math.floor(height + (Math.random()*(height * 0.2)+1));

                kittenURL = this.kittenURL + width + '/' + height;
                if(!this.isRendered()) {
                    this.setElement(this.element);
                    var data = {
                        message: window.location.pathname
                    };
                    var directives = {
                        placekitten: {
                            src: function() {
                                return kittenURL;
                            }
                        }
                    };
                    this.$template.parent().render(data, directives);
                    this.$el.append(this.$template.parent());
                    this.setRendered(true);
                }
            },

            activated: function(featureActivated) {
                this.featureActivated(featureActivated);
            }

        });

        return NotFoundFeature;

    });
})(this);
