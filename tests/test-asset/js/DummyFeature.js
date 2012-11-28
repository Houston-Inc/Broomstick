define(['jquery', 'features/VisibleFeature'], function($, VisibleFeature, undefined) {
    var DummyFeature = VisibleFeature.extend({

        name: "DummyFeature",

        globalEvents: [
        ],

        keyEvents: [
            {
                key: 'a',
                handler: 'foo'
            },
            {
                key: 'b',
                handler: 'bar',
                scope: 'bar'
            }
        ],

        routes: {
            'DummyFeature/:param1/p:param2': 'routeActivated',
            'LOL/:param1/p:param2': 'routeActivated'
        },

        template: $('<h1>DUMMY</h1>')[0],

        foo: function() {
            this.publish('foo', true);
        },

        bar: function() {
            this.publish('bar', true);
        },

        routeActivated: function(param1, param2) {
            this.publish('DummyFeature.routeActivated', { param1: param1,
                                                          param2: param2 });
        },

        render: function() {
            var self = this,
                $template = $(self.template);

            self.setElement(self.element);
            if(self.$el.contents().length === 0) {
                self.$el.append($template);
            }
        }
    });
    return DummyFeature;
});
