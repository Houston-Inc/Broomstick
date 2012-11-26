define([
    'jquery',
    'transparency',
    'features/viewportController',
    'lib/testtools'
], function($, transparency, ViewportController, testtools) {
    "use strict";

    var self = this,
        viewportController;

    transparency.register($);

    describe('ViewportControllerFeature', function() {
        beforeEach(function(){
            testtools.beforeEach();
            viewportController = new ViewportController();
        });

        afterEach(function(){
            testtools.afterEach();
        });

        describe('#initialize', function() {
            it('should initialize successfully', function() {
                expect(viewportController).to.be.ok();
                expect(viewportController.sectionStackCSSTemplate).not.to.be.empty();
            });
        });

        describe('#buildSectionCSS', function() {
            it('should initialize successfully', function() {
                viewportController.sectionStackCount = 3;
                expect(viewportController.buildSectionCSS()).to.be.a('string');
            });
        });

        describe('#renderSectionCSS', function() {
            it('should initialize successfully', function() {
                viewportController.sectionStackCount = 3;
                viewportController.renderSectionCSS(viewportController.sectionStackCSSId, viewportController.buildSectionCSS());
                expect($(viewportController.join("#", viewportController.sectionStackCSSId)).length).to.eql(1);
            });
        });

        describe('#event:section.updated', function() {
            it('should rebuild upon data change', function() {
                viewportController.sectionStackCount = 3;
                viewportController.renderSectionCSS(viewportController.sectionStackCSSId, viewportController.buildSectionCSS());
                var css = $(viewportController.join("#", viewportController.sectionStackCSSId)).text();

                viewportController.publish('section.updated', {
                    data: {
                        stackCount: 5,
                        height: 500
                    }
                });

                expect($(viewportController.join("#", viewportController.sectionStackCSSId)).text()).not.to.be(css);

            });
        });

    });
});
