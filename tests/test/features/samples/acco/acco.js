define([
    'jquery',
    'transparency',
    'features/samples/acco/acco',
    /*'tools',*/
    'lib/testtools'
], function($, transparency, Acco, /*tools,*/ testtools) {

    var self = this,
        acco;

    transparency.register($);

    describe('AccoFeature', function() {
        beforeEach(function(){
            testtools.beforeEach();
            acco = new Acco("testdata");
        });

        afterEach(function(){
            testtools.afterEach();
        });

        describe('#initialize', function() {
            it('should initialize successfully', function() {
                expect(acco).to.be.ok();
            });
        });

        // DOM tests

        describe('#render', function() {
            it('should render to DOM', function() {
                acco.render();
                expect($('#testdata')).to.not.be.empty();
                expect($('#testdata').text()).to.contain("multiple");
            });
        });

    });
});
