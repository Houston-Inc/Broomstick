define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone, undefined) {
    "use strict";

    // FeatureContainer
    // ----------------

    var featuresReady = [],
        FeatureContainer = function(){
        var self = this;

        self.features = [];

    };

    _.extend(FeatureContainer.prototype, Backbone.Events);


    _.extend(FeatureContainer.prototype, {
        name: 'FeatureContainer',

        add: function add(feature) {
            if(this.features.push(feature)) {
                featuresReady.push(feature.isResolved());
                this.trigger('add', feature, this.features);
                return true;
            }

            return false;
        },

        each: function each(callback) {
            _.each(this.features, callback);
        },

        getAt: function getAt(index) {
            return !!this.features[index] ? this.features[index] : undefined;
        },

        getAll: function getAll() {
            return this.features;
        },

        indexOf: function indexOf(feature) {
            return _.indexOf(this.features, feature);
        },

        removeAll: function removeAll() {
            this.features = [];
        },

        count: function count() {
            return this.features.length;
        },

        isResolved: function isResolved() {
            return featuresReady;
        }

    });

    return FeatureContainer;

});
