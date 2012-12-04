define([
    'jquery',
    'underscore',
    'backbone',
    'bootstrap-alert',
    'features/VisibleFeature',
    'features/featureContainer'
], function($, _, Backbone, toaster, VisibleFeature, FeatureContainer, undefined) {
    "use strict";

    // Toaster Feature
    // ------------------------------

    var ToasterFeature = VisibleFeature.extend({

        name: 'ToasterFeature',
        element: '#toaster',
        templateId: '#toaster-alert',
        globalEvents: {
            'ajaxError': 'handleError'
        },

        initialize: function() {
            var self = this;

            self.loaded = $.Deferred();

            self.when(self.templatesResolved(),function() {
                self.$template = self.getTemplate(self.templateId);
                self.resolve(true);
            });
        },

        handleError: function(eventData) {
            var head = 'Järjestelmävirhe',
                message = 'Järjestelmä virhe. Ole hyvä ja yritä uudelleen myöhemmin';

            if(eventData.data.xhr.status === 401) {
                head = 'Pääsy estetty';
                message = 'Käyttäjäsessio on vanhentunut. Ole hyvä ja kirjaudu uudelleen.';
            }
            var data = {
                'alert-heading': head,
                'alert-message': message
            };

            var elem = this.getTemplate(this.templateId);
            elem.render(data);

            this.$el.append(elem);
            elem.queue(function() {
                setTimeout(function() {
                    elem.dequeue();
                    elem.remove();
                }, 2000);
            });
        },

        render: function() {
            var self = this;

            if(!self.isRendered()) {
                $('body').append('<div id="toaster"></div>');
                self.setElement(self.element);
                self.setRendered(true);
            }
        }

    });

    return ToasterFeature;

});
