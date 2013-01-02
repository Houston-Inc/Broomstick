define([
    'jquery',
    'underscore',
    'tools',
    'features/featureContainer',
    'models',
    'collections',
    'views',
    'config'
], function($,
            _,
            tools,
            FeatureContainer,
            models,
            collections,
            views,
            config,
            undefined) {
    "use strict";

    /* Stolen from Backbone's extend */
    var Creator = function(){};

    var inherits = function(parent, protoProps, staticProps) {
        var child;

        if (protoProps && protoProps.hasOwnProperty('constructor')) {
            child = protoProps.constructor;
        } else {
            child = function(){ parent.apply(this, arguments); };
        }

        _.extend(child, parent);

        Creator.prototype = parent.prototype;
        child.prototype = new Creator();
        if (protoProps) {
            _.extend(child.prototype, protoProps);
        }

        if (staticProps) {
            _.extend(child, staticProps);
        }
        child.prototype.constructor = child;

        child.__super__ = parent.prototype;

        return child;
    };

    var extend = function extend(protoProps, classProps) {
        var child = inherits(this, protoProps, classProps);
        child.extend = this.extend;

        return child;
    };

    var BaseFeature = function BaseFeature() {
        this.initialize.apply(this, arguments);
        BaseFeature.prototype.initialize.apply(this, arguments);
    };

    BaseFeature.prototype = {
        name: 'BaseFeature',
        _renderable: false,
        _featuresRenderable: true,
        _feature: true,
        _initialized: false,

        initialize: function() {
            if(!this._initialized) {
                this.initializeSubscriptions();
            }
            this._initialized = true;
        },

        initializeSubscriptions: function initializeSubscriptions() {
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

        getModel: function getModel(name) {
            return models.get(name);
        },

        getCollection: function getCollection(name) {
            return collections.get(name);
        },

        getView: function getView(name) {
            return views.get(name);
        },

        getTemplate: function getTemplate(selector, nounwrap) {
            return tools.templateStorage.get(selector, nounwrap);
        },

        getConfig: function getConfig(name) {
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

        publish: function publish(eventName, eventData) {
            if(!!eventData) {
                eventData.listener = this;
            }
            tools.eventMachine.publish(eventName, !!eventData ? eventData : null);
        },

        isSubscribed: function isSubscribed(eventName, callback) {
            return tools.eventMachine.isSubscribed(eventName, callback);
        },

        subscribe: function subscribe(eventName, callback) {
            callback.listener = this;
            tools.eventMachine.subscribe(eventName, callback);
        },

        scopedSubscribe: function scopedSubscribe(eventName, callback, scope) {
            var method = function(eventData) {
                callback.call(scope, eventData);
            };
            method.scope = scope;
            method.listener = this;
            method.callback = callback;
            tools.eventMachine.subscribe(eventName, method);
        },

        resolve: function resolve(value) {
            this.loaded.resolve(value);
            tools.eventMachine.publish("featureResolved", this);
        },

        registerFeature: function registerFeature(feature) {
            var instance, featureName;

            if(!this.features) {
                throw new Error('FeaturesContainer not set for ' + self.name );
            }

            if(!this.isFeature(feature)) {
                throw new Error(feature + ' (' + typeof feature + ') is not a Feature' + (feature.name ? ' - ' + feature.name : ''));
            }

            instance = feature;
            featureName = feature.name;

            if(this.getConfig('DEBUG')) {
                console.log(this.name, "registering", featureName);
            }

            this.features.add(instance);

            return instance;
        },

        unregisterFeature: function unregisterFeature(feature) {
            var self = this;
            if(_.contains(self.features, feature)) {
                self.features = _.without(self.features, feature);
                return true;
            }
            return false;
        },

        isResolved: function isResolved() {
            if(!this.loaded) {
                throw new Error("Deferred not set");
            }
            return this.loaded.promise();
        },

        isRenderable: function isRenderable() {
            return this._renderable;
        },

        setRenderable: function setRenderable(renderableBoolean) {
            this._renderable = renderableBoolean;
        },

        isFeature: function isFeature(feature) {
            feature = feature || this;
            return _.isObject(feature) &&
                    _.isFunction(feature.isFeature) &&
                    feature._feature;
        },

        isFeaturesRenderable: function isFeaturesRenderable() {
            return this._featuresRenderable;
        },

        setFeaturesRenderable: function setFeaturesRenderable(featuresRenderableBoolean) {
            this._featuresRenderable = featuresRenderableBoolean;
        },

        renderFeatures: function(features) {
            var self = this;
            features = features || this.features;
            features.each(function(feature) {
                if(feature.isRenderable()) {
                    if(self.getConfig('DEBUG')) {
                        console.log("   -- Rendering ", feature.name, feature.features);
                    }
                    feature.render();
                    if(feature.features instanceof FeatureContainer && feature.isFeaturesRenderable()) {
                        self.renderFeatures(feature.features);
                    }
                }
            });
        },

        join: function join() {
            var string = "";
            _.each(arguments, function(argument) {
                string += argument;
            });
            return string;
        },

        when: function when(data, callback) {
            if(_.isArray(data)) {
                $.when.apply($, data).done(callback);
            } else {
                $.when(data).done(callback);
            }
        },

        featureActivated: function featureActivated(eventData) {
            if(eventData.feature === this &&
                (!featureActivated.eventSource ||
                    (eventData.eventSource && !featureActivated.eventSource.route))) {
                this.publish('router.navigate', tools.urls.sanitizeToURL(this.uiName));
            }
        }
    };

    BaseFeature.extend = extend;

    return BaseFeature;

});
