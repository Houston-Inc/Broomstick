define([
    'jquery',
    'transparency',
    'features/accordion//accordion',
    'tools',
    'test-assets',
    'lib/testtools'
], function($, transparency, Accordion, tools, testAssets, testtools) {
    "use strict";

    var self = this,
        accordion;

    transparency.register($);

    describe('AccordionFeature', function() {

        beforeEach(function(){
            testtools.beforeEach();
            accordion = new Accordion("testAccordion");
        });

        afterEach(function(){
            testtools.afterEach();
        });

        describe('#initialize', function() {

            it('should initialize successfully', function() {

                expect(accordion).to.be.ok();

            });

        });

        // DOM tests

        describe('#render', function() {

            it('should populate template with data', function() {

                var render = function() {
                        var selector = "div" + this.element + '-content .accordion-inner';
                        accordion.$template.find(selector).html(this.uiName + ' Content');
                    },
                    AreaSelector = testAssets.DummyFeature.extend({
                        name: "DummyFeature",
                        uiName: "Aluerajaus",
                        element: "#area-selector",
                        render: render,
                        loaded: $.Deferred().resolve(true)
                    }),
                    areaSelector = new AreaSelector(),
                    SegmentSelector = testAssets.DummyFeature.extend({
                        name: "DummyFeature2",
                        uiName: "Segmentit",
                        element: "#segment-selector",
                        render: render,
                        loaded: $.Deferred().resolve(true)
                    }),
                    segmentSelector = new SegmentSelector(),
                    selector = '.accordion-toggle[href="' + areaSelector.element + '-content"]';

                accordion.registerFeature(areaSelector);
                accordion.registerFeature(segmentSelector);

                accordion.setRendered(true);
                accordion.render();

                $("div#testdata").append(accordion.$template);

                expect($("div#testdata").find(selector).first().text()).to.be(areaSelector.uiName);

            });

        });

    });
});
