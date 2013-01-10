define([
    'jquery',
    'underscore',
    'backbone',
    'features/VisibleFeature',
    'features/featureContainer'
], function($, _, Backbone, VisibleFeature, FeatureContainer, undefined) {
    "use strict";

    // RowNavigation Feature
    // ------------------------------

    var RowNavigationFeature = VisibleFeature.extend({

        name: 'RowNavigationFeature',
        uiName: 'RowNavigation',
        element: '#row-navigation',
        events: {
            'click li.section': 'setActiveSection'
        },
        globalEvents: {
            'navigation.activeFeatureSet':  'activeFeatureSet',
            'navigation.sectionUpdated':  'sectionUpdated'
        },

        initialize: function() {
            var self = this;

            self.loaded = $.Deferred();

            self.when(self.templatesResolved(),function() {
                self.$template = self.getTemplate(self.element);
                self.resolve(true);
            });

        },

        setActiveSection: function(event) {
            var $target = $(event.target),
                index = parseInt($target.attr('data-sectionIndex'),10);

            if(!isNaN(index)) {
                this.publish('navigation.sectionClicked', {
                    sectionId: this.section.id,
                    sectionIndex: index
                });

                this.section.currentSection = index;
                this.render();
            }
        },

        activeFeatureSet: function(activeFeature) {
            var section = activeFeature.feature.features.getAt(0);

            this.section = section;

            this.render();
        },

        sectionUpdated: function(event) {
            this.render();
        },

        render: function() {
            var self = this;

            if(self.$el.attr('id') !== 'row-navigation') {
                self.setElement(self.element);
            }

            if(this.section) {
                var $renderTo = self.$el.find('.row-nav'),
                    directives = {
                        section: {
                            'class': function(params) {
                                var r = params.value;
                                if(params.index + 1 === self.section.currentSection) {
                                    r += ' active';
                                }
                                return r;
                            }
                        },
                        ball: {
                            'data-sectionIndex': function(params) {
                                return params.index + 1;
                            }
                        }
                    },
                    features = self.section.features.getAll();

                if($renderTo.length === 0) {
                    self.$el.append(self.$template);
                    $renderTo = self.$el.find('.row-nav');
                }
                if(features.length === 1) {
                    $renderTo.render([]);
                } else {
                    $renderTo.render(features, directives);
                }
            }
        }

    });

    return RowNavigationFeature;

});
