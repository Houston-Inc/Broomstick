define([
    'jquery',
    'underscore',
    'backbone',
    'features/VisibleFeature',
    'features/featureContainer'
], function($, _, Backbone, VisibleFeature, FeatureContainer, undefined) {
    "use strict";

    // Section Feature
    // _______

    var SectionFeature = VisibleFeature.extend({

        name: 'SectionFeature',
        element: '#section',

        globalEvents: {
            'window.resize': 'resize',
            'section.next': 'next'
        },

        keyEvents: [
            {
                key: 'up',
                handler: 'up'
            },
            {
                key: 'down',
                handler: 'down'
            }
        ],

        initialize: function(options) {
            var id = options.id,
                renderTo = options.renderTo,
                noScroll = options.noScroll,
                self = this;

            self.loaded = $.Deferred();

            if(!_.isString(id)) {
                throw new Error(self.name + ': Constructor expects options.id (String) and not (' + id + ')');
            }

            self.id = id;
            self.renderTo = renderTo;
            self.noScroll = noScroll;
            self.currentSection = 1;
            self.features = new FeatureContainer();

            self.when(self.templatesResolved(), function() {
                self.$template = self.getTemplate(self.element);
                self.$viewport = self.$template.find('div.viewport');
                if(!!self.noScroll) {
                    self.$viewport.addClass("no-scroll");
                }
                self.resolve(true);
            });

        },

        build: function(data) {
            var self = this;

            data.viewport = [];

            self.features.each(function(feature) {
                data.viewport.push({
                    section: '',
                    id: feature.id
                });
            });

            self.stackCount = self.features.count();
        },

        getSectionClasses: function() {
            var self = this, classes = [], i;
            for(i = 1; i <= self.stackCount; i++) {
                classes.push("section" + (i + 1));
            }
            return classes.join(" ");
        },

        // Rendering
        render: function() {
            var self = this,
                data = {},
                directives = {
                    viewport: {
                        section: {
                            id: function() {
                                return this.id;
                            }
                        }
                    }
                };

            self.build(data);

            self.$template.render(data, directives);
            self.$template.attr('id', self.id);

            if(!self.isRendered()) {
                self.setElement(self.renderTo);
                self.$el.append(self.$template);
                self.height = self.$el.height();
                self.width = self.$el.width();
                self.publish('keys.registerKeyEvents', self);
                self.setRendered(true);
            }

            self.publish('section.updated', {
                data: {
                    stackCount: self.stackCount,
                    height: self.height,
                    width: self.width
                }
            });
        },

        resize: function() {
            var self = this;
            self.height = self.$el.height();
            self.width = self.$el.width();
            self.render();
        },

        next: function(sectionId) {
            var self = this;

            if(self.id === sectionId && self.currentSection < self.stackCount) {
                self.currentSection += 1;
                self.$viewport.removeClass(self.getSectionClasses());
                self.$viewport.addClass("section" + self.currentSection);
            }
        },

        up: function() {
            var self = this;
            if(self.currentSection > 1) {
                self.currentSection -= 1;
                self.$viewport.removeClass(self.getSectionClasses());
                if(self.currentSection > 1) {
                    self.$viewport.addClass("section" + self.currentSection);
                }
            }
        },

        down: function() {
            var self = this;
            if(self.currentSection < self.stackCount) {
                self.currentSection += 1;
                self.$viewport.removeClass(self.getSectionClasses());
                self.$viewport.addClass("section" + self.currentSection);
            }
        }

    });

    return SectionFeature;

});
