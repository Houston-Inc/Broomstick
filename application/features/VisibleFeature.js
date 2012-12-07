define([
    'jquery',
    'underscore',
    'backbone',
    'tools',
    'features/baseFeature'
], function($, _, Backbone, tools, BaseFeature) {
    "use strict";

    var VisibleFeature = BaseFeature.extend(Backbone.View.prototype);
    VisibleFeature = VisibleFeature.extend({
        name: 'VisibleFeature',
        _renderable: true,
        _rendered: false,

        constructor: function constructor() {
            Backbone.View.prototype.constructor.apply(this, arguments);
            BaseFeature.prototype.initialize.apply(this, arguments);
        },

        setRendered: function setRendered(renderedBoolean) {
            if(_.isBoolean(renderedBoolean)) {
                this._rendered = renderedBoolean;
            }
        },

        isRendered: function isRendered() {
            return this._rendered;
        },

        templatesResolved: function templatesResolved() {
            return tools.templateStorage.isResolved();
        }
    });
    return VisibleFeature;
});
