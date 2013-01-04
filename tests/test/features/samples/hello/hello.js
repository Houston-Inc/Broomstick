define([
    'jquery',
    'transparency',
    'features/samples/hello/hello',
    /*'tools',*/
    'lib/testtools'
], function($, transparency, Hello, /*tools,*/ testtools) {

    var self = this,
        hello;

    transparency.register($);

    describe('HelloFeature', function() {
        beforeEach(function(){
            testtools.beforeEach();
            hello = new Hello({
                renderToId: 'testdata'
            });
        });

        afterEach(function(){
            testtools.afterEach();
        });

        describe('#initialize', function() {
            it('should initialize successfully', function() {
                expect(hello).to.be.ok();
            });
        });

        // DOM tests

        describe('#render', function() {
            it('should render to DOM', function() {
                hello.render();
                expect($('#testdata')).to.not.be.empty();
                expect($('#testdata').text()).to.contain("Hello");
            });
        });

    });
});
