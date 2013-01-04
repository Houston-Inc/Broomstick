define([
    'jquery',
    'underscore',
    'backbone',
    'features/VisibleFeature',
    'collections/Datas'
], function($, _, Backbone, VisibleFeature, Datas, undefined) {
    "use strict";

    // Json Feature
    // ------------------------------

    var JsonFeature = VisibleFeature.extend({

        name: 'JsonFeature',
        element: '#json',
        globalEvents: {
            'collection.datasLoaded': 'asyncRender'
        },

        initialize: function(options) {
            var self = this,
                renderToId = options.renderToId,
                sectionId = options.sectionId;

            if(!_.isString(renderToId)) {
                throw new Error(self.name + ": Constructor expects id (String)");
            }

            self.id = renderToId;
            self.sectionId = sectionId;

            self.loaded = $.Deferred();

            self.when(self.templatesResolved(),function() {
                self.$template = self.getTemplate(self.element);
                self.resolve(true);
            });


            self.datas = new Datas();
            self.datas.fetch();
        },

        // Rendering

        build: function(data) {
            var self = this;

            self.datas.each(function(d) {
                data.push({
                   name: d.get('name'),
                   content: d.get('content'),
                   id: d.id
                });
            });
        },

        asyncRender: function(data) {
            var self = this;

            if(self.isRendered()) {
                self.render();
            }
        },

        render: function() {
            var self = this,
                data = [];

            self.build(data);
            self.$template.render(data);

            if(!self.isRendered()) {
                self.setElement(self.element);
                self.$el.append(self.$template);
                self.setRendered(true);
            }

        }

    });

    return JsonFeature;

});
