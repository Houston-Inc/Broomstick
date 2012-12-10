define([
    'jquery',
    'transparency',
    '{%= testPathName %}',
    /*'tools',*/
    'lib/testtools'
], function($, transparency, {%= capitalizedName %}, /*tools,*/ testtools) {
    "use strict";

    var self = this,
        {%= name %};

    transparency.register($);

    describe('{%= capitalizedName %}Feature', function() {
        beforeEach(function(){
            testtools.beforeEach();
            {%= name %} = new {%= capitalizedName %}();
        });

        afterEach(function(){
            testtools.afterEach();
        });

        describe('#initialize', function() {
            it('should initialize successfully', function() {
                expect({%= name %}).to.be.ok();
            });
        });

        // Event tests

        describe('#eventPublish', function () {
            it('should publish event', function(done) {
                {%= name %}.subscribe('eventName', function(eventData) {
                    // expect(eventData).to.be(something);
                    done();
                });
                {%= name %}.methodWhichShouldPublishEvent();
            });
        });

        // DOM tests

        describe('#render', function() {
            it('should render to DOM', function() {
                {%= name %}.render();
                expect($('#{%= dashNotatedName %}')).to.not.be.empty();
                expect($('#{%= dashNotatedName %}').text()).to.eql("somestring");
            });
        });

    });
});
