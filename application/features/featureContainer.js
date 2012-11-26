define(['jquery', 'underscore', 'backbone'], function($, _, Backbone, undefined) {
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

        add: function(feature) {


            if(this.features.push(feature)) {
                featuresReady.push(feature.isResolved());
                this.trigger('add', feature, this.features);
                return true;
            }

            return false;

        },

        each: function(callback) {
            _.each(this.features, callback);
        },

        getAt: function(index) {
            return !!this.features[index] ? this.features[index] : undefined;
        },

        getAll: function() {
            return this.features;
        },

        indexOf: function(feature) {
            return _.indexOf(this.features, feature);
        },

        removeAll: function() {
            this.features = [];
        },

        count: function() {
            return this.features.length;
        },

        isResolved: function() {
            return featuresReady;
        }

    });

    return FeatureContainer;

});
