define([
    'jquery',
    'underscore',
    'features/ajaxError',
    'tools/eventMachine',
    'lib/testtools'
], function($, _, AjaxError, eventMachine, testtools) {
    "use strict";

    var self = this,
        ajaxError;

    describe('AjaxErrorFeature', function() {
        beforeEach(function(){
            testtools.beforeEach();
            ajaxError = new AjaxError();
        });

        afterEach(function(){
            testtools.afterEach();
        });

        describe('#initialize', function() {
            it('should initialize successfully', function() {
                expect(ajaxError).to.be.ok();
            });
        });

        describe('#activate', function() {
            it('should add error handler to global jquery ajax handler', function(done) {               
                ajaxError.subscribe("ajaxError", function(eventData) {
                    done();
                });
                $.ajax({
                    url: 'http://127.0.0.1:8080/error/401',
                    dataType: 'jsonp'
                });
            });
        });


    });
});
