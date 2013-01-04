define([
    'jquery',
    'transparency',
    'features/utils/loading/loading',
    /*'tools',*/
    'lib/testtools'
], function($, transparency, Loading, /*tools,*/ testtools) {
    "use strict";

    var self = this,
        loading;

    transparency.register($);

    describe('LoadingFeature', function() {
        beforeEach(function(){
            testtools.beforeEach();
            loading = new Loading({
                message: "JEEJEELOADING!"
            });
        });

        afterEach(function(){
            testtools.afterEach();
        });

        describe('#initialize', function() {
            it('should initialize successfully', function() {
                expect(loading).to.be.ok();
            });
        });

        describe('#add', function () {
            it('should add loading to DOM', function() {
                loading.add($('#testdata'));
                expect($('#testdata .loading')).to.not.be.empty();
                expect($('#testdata .loading .message').html()).to.be.eql('JEEJEELOADING!');
            });
        });

        describe('#remove', function() {
            it('should remove loading from DOM', function() {
                loading.add($('#testdata'));
                expect($('#testdata .loading')).to.not.be.empty();
                expect($('#testdata .loading .message').html()).to.be.eql('JEEJEELOADING!');
                loading.remove();
                expect($('#testdata .loading').length).to.be.eql(0);
            });
        });

    });
});
