define([
    'jquery',
    'transparency',
    'features/samples/acco2/acco2',
    /*'tools',*/
    'lib/testtools'
], function($, transparency, Acco2, /*tools,*/ testtools) {

    var self = this,
        acco2;

    transparency.register($);

    describe('Acco2Feature', function() {
        beforeEach(function(){
            testtools.beforeEach();
            acco2 = new Acco2("testdata");
        });

        afterEach(function(){
            testtools.afterEach();
        });

        describe('#initialize', function() {
            it('should initialize successfully', function() {
                expect(acco2).to.be.ok();
            });
        });

        // DOM tests

        describe('#render', function() {
            it('should render to DOM', function() {
                acco2.render();
                expect($('#testdata')).to.not.be.empty();
                expect($('#testdata').text()).to.contain("ready");
            });
        });

    });
});
