define([
    'jquery',
    'transparency',
    'features/samples/json/json',
    /*'tools',*/
    'lib/testtools'
], function($, transparency, Json, /*tools,*/ testtools) {

    var self = this,
        json;

    transparency.register($);

    describe('JsonFeature', function() {
        beforeEach(function(){
            testtools.beforeEach();
            json = new Json({
                renderToId: 'testdata'
            });
        });

        afterEach(function(){
            testtools.afterEach();
        });

        describe('#initialize', function() {
            it('should initialize successfully', function() {
                expect(json).to.be.ok();
            });
        });

        // DOM tests

        describe('#render', function() {
            it('should render to DOM', function() {
                json.render();
                expect($('#testdata')).to.not.be.empty();
            });
        });

    });
});
