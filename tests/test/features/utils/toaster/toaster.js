define([
    'jquery',
    'transparency',
    'features/utils/toaster/toaster',
    /*'tools',*/
    'lib/testtools'
], function($, transparency, Toaster, /*tools,*/ testtools) {
    "use strict";

    var self = this,
        toaster;

    transparency.register($);

    describe('ToasterFeature', function() {
        beforeEach(function(){
            testtools.beforeEach();
            toaster = new Toaster();
        });

        afterEach(function(){
            testtools.afterEach();
        });

        describe('#initialize', function() {
            it('should initialize successfully', function() {
                expect(toaster).to.be.ok();
            });
        });

        // DOM tests

        describe('#render', function() {
            it('should render to DOM', function() {
                toaster.render();
                expect($('#toaster')).to.not.be.empty();
            });
        });

    });
});
