define([
    'jquery',
    'underscore',
    'backbone',
    'features/baseFeature'
], function($, _, Backbone, BaseFeature, undefined) {
    "use strict";

    // Router Feature
    // _______

    var RouterFeature = BaseFeature.extend({

        name: 'RouterFeature',
        _renderable: false,
        globalEvents: {
            'router.registerRoutes': 'registerRoutes',
            'router.navigate': 'navigate',
            'application.ready': 'allRoutesRegistered'
        },

        initialize: function() {
            var self = this;

            self.router = new Backbone.Router();
            self._registeredRoutes = {};

            self.loaded = $.Deferred();
            self.resolve(true);

            Backbone.history = new Backbone.History();
            Backbone.History.started = false;
        },

        _mergeRoutes: function(o1, o2) {
            // makes shallow copy
            var ret = _.clone(o1),
                self = this;
            _.each(o2, function(names, route) {
                if(!_.has(ret, route)) {
                    ret[route] = [];
                }
                ret[route] = ret[route].concat(names);
            });
            return ret;
        },

        _addToRouteToObject: function(name, route, object) {
            if(!_.has(object, route)) {
                object[route] = [];
            }
            object[route].push(name);
            return object;
        },

        registerRoutes: function(feature) {
            var ret = {},
                routes = feature.routes,
                router = this.router,
                self = this;
            if(routes) {
                _.each(routes, function(methodName, route) {
                    if(!feature[methodName]) {
                        throw new Error('Route ' + route + ' handler ' + methodName + ' doesn\'t exist.');
                    }
                    var routeName = feature.name + '.' + methodName;
                    var method = function() {
                        var args = [];
                        _.each(arguments, function(value, index) {
                            args.push(value);
                        });
                        var eventData = {
                            route: route,
                            feature: feature,
                            args: args,
                            name: routeName
                        };
                        self.publish('router.activated', eventData);
                        feature[methodName].apply(feature, [args, route]);
                    };
                    router.route(route, routeName, method);
                    self.publish('router.registeredRoute', {
                        route: route,
                        feature: feature,
                        handler: methodName,
                        name: routeName
                    });
                    ret = self._addToRouteToObject(routeName, route, ret);
                });
                this._registeredRoutes = this._mergeRoutes(this._registeredRoutes, ret);
            }
            return ret;
        },

        allRoutesRegistered: function() {
            if(!Backbone.History.started) {
                try {
                    Backbone.history.start({ pushState: true });
                }
                catch(e) {
                    // If this isn't done, the built tests break - so omit...
                }
            }
        },

        hasRoute: function(name) {
            var self = this;
            return _.contains(self._registeredRoutes,name);
        },

        navigate: function(route) {
            this.allRoutesRegistered();
            this.router.navigate(route, { trigger: true });
        }

    });

    return RouterFeature;

});
