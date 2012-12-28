define([
    'jquery',
    'transparency',
    'features/section/section',
    'tools',
    'test-assets',
    'lib/testtools'
], function($, transparency, Section, tools, testAssets, testtools) {
    "use strict";

    var self = this,
        section;

    transparency.register($);

    describe('SectionFeature', function() {
        beforeEach(function(){
            testtools.beforeEach();
            section = new Section({
                id: 'test-section'
            });
        });

        afterEach(function(){
            testtools.afterEach();
        });

        describe('#initialize', function() {
            it('should initialize successfully', function(done) {
                expect(section).to.be.ok();
                done();
            });
        });

        // DOM tests

        describe('#render', function() {

            it('should populate template with data', function() {

                var render = function() {
                        section.$template.find("#" + this.id).html(this.uiName);
                    },
                    SampleFeature = testAssets.DummyFeature.extend({
                        name: "SampleFeature",
                        uiName: "Sample",
                        element: "#sample-feature",
                        render: render,
                        id: "sample-feature-section",
                        loaded: $.Deferred().resolve(true)
                    }),
                    sampleFeature = new SampleFeature(),
                    AnalyzerFeature = testAssets.DummyFeature.extend({
                        name: "AnalyzerFeature",
                        uiName: "Asiakasymmärrys",
                        element: "#analyzer-feature",
                        render: render,
                        id: "analyzer-feature",
                        loaded: $.Deferred().resolve(true)
                    }),
                    analyzerFeature = new AnalyzerFeature(),
                    selector = "#" + sampleFeature.id;

                section.registerFeature(sampleFeature);
                section.registerFeature(analyzerFeature);

                section.setRendered(true);
                section.render();

                $("div#testdata").append(section.$template);
                expect($("div#testdata").find(selector).length).to.eql(1);

            });

        });

    });
});
