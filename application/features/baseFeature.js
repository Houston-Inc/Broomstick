define([
    'jquery',
    'underscore',
    'backbone',
    'tools',
    'models',
    'collections',
    'views',
    'config'
], function($, _, Backbone, tools, models, collections, views, config, undefined) {
    "use strict";

    var BaseFeature = Backbone.View.extend({
        name: 'BaseFeature',
        _renderable: true,
        _featuresRenderable: true,
        _rendered: false,
        _feature: true,
        _: _,

        initializeSubscriptions: function() {
            var self = this;
            if(self.globalEvents) {
                _.each(self.globalEvents, function(event, name) {
                    if(typeof(self[event]) === 'function') {
                        self.scopedSubscribe(name, self[event], self);
                    } else {
                        throw new Error("Function " + name + " not found from " + self.name);
                    }
                });
            }
        },

        getModel: function(name) {
            return models.get(name);
        },

        getCollection: function(name) {
            return collections.get(name);
        },

        getView: function(name) {
            return views.get(name);
        },

        getFeature: function(name) {
            if(config.DEBUG) {
                console.log("getFeature:", name);
            }
            return this.featuresProxy.get(name);
        },

        getTemplate: function(selector, nounwrap) {
            return tools.templateStorage.get(selector, nounwrap);
        },

        getConfig: function(name) {
            var parts = name.split("."),
                l, i, c = config;

            for (i = 0, l = parts.length; i < l; i++) {
                if(c[parts[i]] === undefined) {
                    throw new Error("Could not find configuration item");
                }
                c = c[parts[i]];
            }

            return c;
        },

        publish: function(eventName, eventData) {
            if(!!eventData) {
                eventData.listener = this;
            }
            tools.eventMachine.publish(eventName, !!eventData ? eventData : null);
        },

        isSubscribed: function(eventName, callback) {
            return tools.eventMachine.isSubscribed(eventName, callback);
        },

        subscribe: function(eventName, callback) {
            callback.listener = this;
            tools.eventMachine.subscribe(eventName, callback);
        },

        scopedSubscribe: function(eventName, callback, scope) {
            var method = function(eventData) {
                callback.call(scope, eventData);
            };
            method.scope = scope;
            method.listener = this;
            method.callback = callback;
            tools.eventMachine.subscribe(eventName, method);
        },

        resolve: function(value) {
            this.loaded.resolve(value);
            tools.eventMachine.publish("featureResolved", this);
        },


        registerFeature: function(feature) {
            var self = this, Feature, instance, featureName;


            if(!self.features) {
                throw new Error( "FeaturesContainer not set for " + self.name );
            }

            if(self.featureIsFeature(feature)) {
                instance = feature;
                featureName = feature.name;
            } else {
                Feature = self.getFeature(feature);
                instance = new Feature();
                featureName = feature;
            }

            if(self.getConfig('DEBUG')) {
                console.log(self.name, "registering", featureName);
            }

            self.features.add(instance);

            return instance;
        },

        deregisterFeature: function(feature) {
            var self = this;
            if(_.contains(self.features, feature)) {
                self.features = _.without(self.features, feature);
                return true;
            }
            return false;
        },

        isResolved: function() {
            if(!this.loaded) {
                throw new Error("Deferred not set");
            }
            return this.loaded.promise();
        },

        setRendered: function(renderedBoolean) {
            this._rendered = renderedBoolean;
        },

        isRenderable: function() {
            return this._renderable;
        },

        setRenderable: function(renderableBoolean) {
            this._renderable = renderableBoolean;
        },

        isRendered: function() {
            return this._rendered;
        },

        isFeature: function() {
            return this._feature;
        },

        featureIsFeature: function(feature) {
            return !_.isEmpty(feature) &&
                    _.isObject(feature) &&
                    _.isFunction(feature.isFeature) &&
                    feature.isFeature();
        },

        isFeaturesRenderable: function() {
            return this._featuresRenderable;
        },

        setFeaturesRenderable: function(featuresRenderableBoolean) {
            this._featuresRenderable = featuresRenderableBoolean;
        },

        join: function() {
            var string = "";
            _.each(arguments, function(argument) {
                string += argument;
            });
            return string;
        },

        templatesResolved: function() {
            return tools.templateStorage.isResolved();
        },

        when: function(data, callback) {
            if(_.isArray(data)) {
                $.when.apply($, data).done(callback);
            } else {
                $.when(data).done(callback);
            }
        },

        featureActivated: function(featureActivated) {
            if(featureActivated.feature === this &&
                ((featureActivated.eventSource &&
                !featureActivated.eventSource.route) ||
                !featureActivated.eventSource)) {
                this.publish('router.navigate', tools.urls.sanitizeToURL(this.uiName));
            }
        }

    });

    return BaseFeature;

});
