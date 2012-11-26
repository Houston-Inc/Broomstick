(function(window, document) {
    "use strict";

    define(['jquery', 'tools/templatestorage'], function($, templatestorage) {

        describe('templatestorage', function() {
            beforeEach(function() {
                $('body').append('<div id="testdata" style="display: none;"></div>');
            });
            afterEach(function() {
                $('#testdata').remove();
            });
            describe('#initialize', function() {
                it('should load templates from html', function() {
                    templatestorage.initialize();
                    var $template = templatestorage.get('#broomstick');
                    expect($template.length).to.be.greaterThan(1);
                });
            });
            describe('#get', function() {
                it('should have deferred object resolved when the templates are loaded from dom', function(testDone) {
                    var loaded = templatestorage.initialize();
                    $.when(loaded).done(function() {
                        var storage = templatestorage.get('#broomstick');
                        expect(storage).to.not.be.empty();
                        testDone();
                    });
                });
                it('should have deferred object resolved when the templates are loaded from dom when it\'s done twice', function(testDone) {
                    var loaded = templatestorage.initialize();
                    $.when(loaded).done(function() {
                        var storage = templatestorage.get('#broomstick');
                        expect(storage).to.not.be.empty();
                        $('#testdata').append(storage);
                        var storage2 = templatestorage.get('#broomstick');
                        expect(storage2).to.not.be.empty();
                        testDone();
                    });
                });
            });
        });
    });
}(this, this.document));
