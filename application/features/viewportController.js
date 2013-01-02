/*global window */
define([
    'jquery',
    'underscore',
    'backbone',
    'features/VisibleFeature',
    'features/featureContainer'
], function($, _, Backbone, VisibleFeature, FeatureContainer, undefined) {
    "use strict";

    // ViewportController Feature
    // --------------------------

    var ViewportControllerFeature = VisibleFeature.extend({

        name: 'ViewportControllerFeature',
        sectionStackCSSId: 'section-stack-css',
        sectionViewportCSSId: 'section-viewport-css',
        sectionStackCount: 0,
        viewportHeight: 0,
        globalEvents: {
            'window.resize': 'resize',
            'section.updated': 'updateSectionData',
            'application.ready': 'render'
        },

        initialize: function() {
            var self = this;

            self.loaded = $.Deferred();

            self.createIEStyles();

            self.when(self.templatesResolved(), function() {
                self.sectionStackCSSTemplate = self.getTemplate( self.join( "#", self.sectionStackCSSId ) ).text();
                self.sectionViewportCSSTemplate = self.getTemplate( self.join("#", self.sectionViewportCSSId ) ).text();
                self.resolve(true);
            });

        },

        createIEStyles: function() {
            var ieTag, templateTag, self = this;
            if($('html').hasClass('lt-ie8')) {
                templateTag = $("#templates");
                ieTag = '<link type="text/css" rel="stylesheet/less" href="application/less/ie.less" />';
                $(ieTag).insertBefore(templateTag);
            }
        },

        forceIE7Redraw: function() {
            if($('html').hasClass('lt-ie8')) {
                $(window).trigger('resize');
            }
        },

        resize: function() {

        },

        getViewportHeight: function() {
            if($('html').hasClass('lt-ie8')) {
                return this.viewportHeight - 20;
            }
            return this.viewportHeight;
        },

        updateSectionData: function(eventData) {
            var self = this, changed = false;
            if(self.sectionStackCount < eventData.data.stackCount) {
                self.sectionStackCount = eventData.data.stackCount;
                changed = true;
            }
            if(self.viewportHeight !== eventData.data.height) {
                self.viewportHeight = eventData.data.height;
                changed = true;
            }

            if(self.viewportWidth !== eventData.data.width) {
                self.viewportWidth = eventData.data.width;
                changed = true;
            }

            if(changed) {
                self.rebuildSectionCSS();
            }
        },

        rebuildSectionCSS: function() {
            var self = this,
                sectionCSS = self.buildSectionCSS();
            self.renderSectionCSS(self.sectionStackCSSId, sectionCSS);
        },

        buildSectionCSS: function() {
            var self = this, i, css = "";

            for(i = 1; i <= self.sectionStackCount; i++) {
                css += self.sectionStackCSSTemplate.replace( "{index}", i + 1 ).replace( "{height}", (self.getViewportHeight() * i) + (i * 13) );
            }

            css += self.sectionViewportCSSTemplate.replace( "{height}", self.getViewportHeight() );

            return css;
        },

        renderSectionCSS: function(id, css) {
            if(!_.isEmpty(css)) {
                $(this.join("#", id)).remove();
                $('<style id="' + id + '" type="text/css">' + css +'</style>').prependTo('head');
                this.forceIE7Redraw();
                this.publish("viewport.resize", {
                    data: {
                        viewportWidth: this.viewportWidth,
                        viewportHeight: this.viewportHeight
                    }
                });
            }
        },

        render: function() {
            var self = this;

            //self.rebuildSectionCSS();
        }

    });

    return ViewportControllerFeature;

});
