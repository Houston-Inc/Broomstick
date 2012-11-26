define(['jquery', 'tools', 'test-assets'], function($, tools, testAssets) {
    var port = {};
    port.beforeEach = function beforeEach() {
        tools.eventMachine.clear();
        tools.templateStorage.initialize();
        $('body').append('<div id="testdata" style="display: none;"></div>');
    };
    port.afterEach = function afterEach() {
        $('#testdata').remove();
    };

    /* Stolen from keymasters test/keymaster.html */
    port.keydown = function keydown(code, el) {
        var event = document.createEvent('Event');
        event.initEvent('keydown', true, true);
        event.keyCode = code;
        (el||document).dispatchEvent(event);
    };

    port.keyup = function keyup(code, el) {
        var event = document.createEvent('Event');
        event.initEvent('keyup', true, true);
        event.keyCode = code;
        (el||document).dispatchEvent(event);
    };

    port.createFeatures = function createFeatures() {
        var feats = {};
        $('#testdata').append('<div id="feat1"></div>');
        var D1 = testAssets.DummyFeature.extend({
            name: "Feature1",
            uiName: "Feature1",
            element: "#feat1",
            loaded: $.Deferred().resolve(true)
        });
        var feature1 = new D1();

        $('#testdata').append('<div id="feat2"></div>');
        var D2 = testAssets.DummyFeature.extend({
            name: "Feature2",
            uiName: "Feature2",
            element: "#feat2",
            loaded: $.Deferred().resolve(true)
        });
        var feature2 = new D2();

        $('#testdata').append('<div id="feat3"></div>');
        var D3 = testAssets.DummyFeature.extend({
            name: "Feature3",
            uiName: "Feature3",
            element: "#feat3",
            loaded: $.Deferred().resolve(true)
        });
        var feature3 = new D3();
        return [feature1, feature2, feature3];
    };


    return port;
});
