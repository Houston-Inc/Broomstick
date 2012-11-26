define([
    'jquery',
    'transparency',
    'collections/aggregations',
    'tools'
], function($, transparency, Aggregations, tools) {
    "use strict";

    var self = this;

    transparency.register($);

    describe('Aggregations Collection', function() {
        describe('#initialize', function() {
            it('should initialize successfully', function(done) {
                var instance = new Aggregations(undefined);
                expect(instance).to.be.ok();
                done();
            });
        });

        describe('#contains', function() {
            it('should contain models when reset is triggered', function(done) {
                tools.eventMachine.subscribe("AggregationsCollection:AggregationsLoaded", function(classifications) {
                    expect(instance.at(0).get("name")).to.be.eql("Määrä");
                    done();
                });
                var instance = new Aggregations(undefined);
                instance.add([{"id":"1","name":"Määrä"},{"id":"2","name":"Prosentti"}]);
                instance.trigger("reset");
            });
        });

    });
});
