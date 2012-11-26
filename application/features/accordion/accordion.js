define([
    'jquery',
    'backbone',
    'features/baseFeature',
    'features/featureContainer',
    'tools/exceptions'
], function($, Backbone, BaseFeature, FeatureContainer, exceptions, undefined) {
    "use strict";

    // Accordion Feature
    // -----------------

    var AccordionFeature = BaseFeature.extend({

        name:           'AccordionFeature',
        element:        'div#accordion',

        events: {
            'click .accordion-buttons .prev' : 'prev',
            'click .accordion-buttons .next' : 'next',
            'click .accordion-buttons .last' : 'calculate'
        },

        initialize: function(id, sectionId) {
            var self = this;

            if(!self._.isString(id)) {
                throw new exceptions.FatalError(self.name + ": Constructor expects id (String)");
            }

            self.id = id;
            self.sectionId = sectionId;

            self.loaded = $.Deferred();
            self.features = new FeatureContainer();

            self.features.on('add', self.asyncRender, self);

            self.when(self.templatesResolved(), function() {
                self.$template = self.getTemplate(self.element);
                self.resolve(true);
            });

        },

        prev: function(event) {
            var elem = $(event.currentTarget).closest('.accordion-group');
            elem.children('.accordion-body').removeClass('in');
            elem.prev().find('.accordion-body').addClass('in');
        },

        next: function(event) {
            var elem = $(event.currentTarget).closest('.accordion-group');
            elem.children('.accordion-body').removeClass('in');
            elem.next().find('.accordion-body').addClass('in');
        },

        calculate: function() {
            this.publish('accordion.calculate');
            this.publish('section.next',this.sectionId);
        },

        build: function(data) {
            var self = this;

            self.features.each(function(feature) {
                data.push({
                   'accordion-heading': {
                        'accordion-toggle': feature.uiName,
                        parentElement: self.join("#",self.id),
                        href: feature.element + '-content'
                    }
                });
            });

        },

        asyncRender: function() {
            var self = this;

            if(self.isRendered()) {
                self.render();
            }
        },

        render: function() {
            var self = this,
                data = [],
                directives = {
                    'accordion-heading': {
                        'accordion-toggle': {
                            'href': function() {
                                return this.href;
                            },
                            'data-parent': function() {
                                return this.parentElement;
                            }
                        }
                    },
                    'accordion-body': {
                        'id': function() {
                            return this['accordion-heading'].href.split("#")[1];
                        },
                        'class': function(params) {
                            var inClass = params.index === 0 ? ' in' : '';
                            return 'accordion-body collapse' + inClass;
                        }
                    },
                    'prev': {
                        'class': function(params) {
                            return params.index === 0 ? 'hide btn' : 'prev btn';
                        }
                    },
                    'next': {
                        'text': function(params) {
                            if(params.index === self.features.count() - 1) {
                                return 'Valmis';
                            }
                            return 'Seuraava';
                        },
                        'class': function(params) {
                            if(params.index === self.features.count() - 1) {
                                return 'last btn';
                            }
                            return 'next btn';
                        }
                    }
                };

            self.build(data);

            self.$template.render(data, directives);

            if(!self.isRendered()) {
                self.setElement(self.join("#", self.id));
                self.$el.append(self.$template);
                self.setRendered(true);
            }

        }

    });

    return AccordionFeature;

});
