define([
    'jquery',
    'underscore',
    'backbone',
    'features/VisibleFeature',
    'features/featureContainer'
], function($, _, Backbone, VisibleFeature, FeatureContainer, undefined) {
    "use strict";

    // Navigation Feature
    // _______

    var NavigationFeature = VisibleFeature.extend({

        name: 'NavigationFeature',
        uiName: 'Navigaatio',
        element: 'nav#navigation',
        features: [],
        events: {
            "click li.feature":             "setActiveFeature"
        },
        globalEvents: {
            'moduleInitialized':            'registerFeature',
            'navigation.setActiveFeature':  'setActiveFeature',
            'navigation.registeredFeature': 'render',
            'navigation.activeFeatureSet':  'render',
            'navigation.left':              'left',
            'navigation.right':             'right',
            'router.activated':             'routeActivated'
        },
        keyEvents: [
            {
                key: 'left',
                handler: 'left'
            },
            {
                key: 'right',
                handler: 'right'
            }
        ],

        initialize: function() {
            var self = this;

            self.setFeaturesRenderable(false);

            self.activeFeature = undefined;

            self.loaded = $.Deferred();
            self.features = new FeatureContainer();

            self.features.on('add', self.featureAdded, self);

            self.when(self.templatesResolved(),function() {
                self.$template = self.getTemplate('#navigation-template');
                self.publish('keys.registerKeyEvents', self);
                self.resolve(true);
            });
        },

        registerFeature: function(feature) {
            if(feature && this.features.add(feature)) {
                return true;
            }
            throw new Error('Failed to register feature ' + feature.name);
        },

        featureAdded: function(feature, features) {
            var self = this;
            if(features.length === 1) {
                self.activeFeature = 1;
            }
            self.publish('navigation.registeredFeature', feature);
        },

        render: function() {
            var self = this,
                directives = {
                    feature: {
                        'data-feature': function() {
                            return this.name;
                        },
                        'data-column': function(params) {
                            return params.index + 1;
                        },
                        'class': function(params) {
                            var r = params.value;
                            if(params.index + 1 === self.activeFeature) {
                                r += ' active';
                            }
                            return r;
                        }
                    },
                    nav_link: {
                        text: function() {
                            return this.uiName;
                        }
                    }
                },
                features = self.features.getAll();
            if(self.$el.attr('id') !== 'navigation') {
                self.setElement(self.element);
            }
            var $renderTo = self.$el.find('.nav-pills');
            if($renderTo.length === 0) {
                self.$el.append(self.$template);
                $renderTo = self.$el.find('.nav-pills');
            }
            $renderTo.render(features, directives);
        },

        routeActivated: function(routeEvent) {
            var index = this.features.indexOf(routeEvent.feature);
            if(index !== -1) {
                this.setActiveFeature(index+1, routeEvent);
            }
        },

        setActiveFeature: function(event, routeEvent) {
            var self = this,
                number = _.isNumber(event) ? event : parseInt($(event.currentTarget).attr('data-column'), 10),
                feature = self.features.getAt(number-1),
                featureLength = self.features.getAll().length,
                eventSource = !_.isNumber(event) ? event : routeEvent;
            if(number > featureLength) {
                number = 1;
                feature = self.features.getAt(number-1);
            }
            if(number === 0) {
                number = featureLength;
                feature = self.features[number-1];
            }
            if(self.activeFeature !== number) {
                self.activeFeature = number;
                self.publish('navigation.activeFeatureSet', {
                    column: self.activeFeature,
                    eventSource: eventSource,
                    feature: feature
                });
            }
            setTimeout(function() {
               $('#loading').css({'z-index': 'auto', background: 'none'});
            },600);
            return self.activeFeature;
        },

        right: function() {
            return this.setActiveFeature(this.activeFeature+1);
        },

        left: function() {
            return this.setActiveFeature(this.activeFeature-1);
        }

    });

    return NavigationFeature;

});
