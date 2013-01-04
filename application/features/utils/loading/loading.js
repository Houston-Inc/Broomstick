define([
    'jquery',
    'backbone',
    'features/VisibleFeature'
], function($, Backbone, VisibleFeature, undefined) {
    "use strict";

    // Loading Feature
    // ------------------------------

    var LoadingFeature = VisibleFeature.extend({
        name: 'LoadingFeature',
        element: '#loading',
        defaultMessage: 'Ladataan...',

        initialize: function(options) {
            var self = this;

            self.message = options ? options.message : self.defaultMessage;

            self.loaded = $.Deferred();

            self.when(self.templatesResolved(),function() {
                self.$template = self.getTemplate(self.element);
                self.resolve(true);
            });

        },

        add: function($element) {
            var self = this;

            if(!self.isRendered()) {
                self.setElement(self.element);
                var message = {
                    message: self.message
                };
                self.element = self.$template.clone().render(message);
                $element.append(self.element);
                self.setRendered(true);
            }
        },

        remove: function() {
            var self = this;
            self.element.remove();
        }

    });

    return LoadingFeature;

});
