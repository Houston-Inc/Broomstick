define([
    'jquery',
    'transparency',
    'features/navigation/row/rowNavigation',
    /*'tools',*/
    'lib/testtools'
], function($, transparency, RowNavigation, /*tools,*/ testtools) {

    var self = this,
        rowNavigation;

    transparency.register($);

    describe('RowNavigationFeature', function() {
        beforeEach(function(){
            testtools.beforeEach();
            rowNavigation = new RowNavigation();
        });

        afterEach(function(){
            testtools.afterEach();
        });

        describe('#initialize', function() {
            it('should initialize successfully', function() {
                expect(rowNavigation).to.be.ok();
            });
        });
    });
});
