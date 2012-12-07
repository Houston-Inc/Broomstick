define([
    'jquery',
    'transparency',
    'collections/datas',
    'tools'
], function($, transparency, Datas, tools) {
    "use strict";

    var self = this;

    transparency.register($);

    describe('Datas Collection', function() {
        describe('#initialize', function() {
            it('should initialize successfully', function(done) {
                var instance = new Datas(undefined);
                expect(instance).to.be.ok();
                done();
            });
        });

        describe('#contains', function() {
            it('should contain models when reset is triggered', function(done) {
                tools.eventMachine.subscribe("collection.datasLoaded", function(datas) {
                    expect(datas.at(0).get("name")).to.be.eql("JSON Data");
                    done();
                });
                var instance = new Datas(undefined);
                instance.add([{"id":"1","name":"JSON Data","content": "This data is dynamically loaded!"}]);
                instance.trigger("reset");
            });
        });

    });
});
