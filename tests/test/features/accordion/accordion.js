define([
    'jquery',
    'transparency',
    'features/accordion/accordion',
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
                    ASelector = testAssets.DummyFeature.extend({
                        name: "ASelector",
                        uiName: "A selector",
                        element: "#a-selector",
                        render: render,
                        loaded: $.Deferred().resolve(true)
                    }),
                    aSelector = new ASelector(),
                    BSelector = testAssets.DummyFeature.extend({
                        name: "BSelector",
                        uiName: "B selector",
                        element: "#b-selector",
                        render: render,
                        loaded: $.Deferred().resolve(true)
                    }),
                    bSelector = new BSelector(),
                    selector = '.accordion-toggle[href="' + aSelector.element + '-content"]';

                var features = {
                    'ASelector': ASelector,
                    'BSelector': BSelector
                };
                accordion.registerFeature(aSelector);
                accordion.registerFeature(bSelector);

                accordion.setRendered(true);
                accordion.render();

                $("div#testdata").append(accordion.$template);

                expect($("div#testdata").find(selector).first().text()).to.be(aSelector.uiName);

            });

        });

    });
});
