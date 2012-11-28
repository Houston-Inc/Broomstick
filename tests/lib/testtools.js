define([
    'jquery',
    'underscore',
    'tools',
    'test-assets'
], function($, _, tools, testAssets) {
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

    port.createFeaturePrototypeList = function createFeaturePrototypeList() {
        var D1 = testAssets.DummyFeature.extend({
            name: "Feature1",
            uiName: "Feature1",
            element: "#feat1",
            loaded: $.Deferred().resolve(true)
        });

        var D2 = testAssets.DummyFeature.extend({
            name: "Feature2",
            uiName: "Feature2",
            element: "#feat2",
            loaded: $.Deferred().resolve(true)
        });

        var D3 = testAssets.DummyFeature.extend({
            name: "Feature3",
            uiName: "Feature3",
            element: "#feat3",
            loaded: $.Deferred().resolve(true)
        });
        return [D1, D2, D3];
    };

    port.createFeatures = function createFeatures(featurePrototypes) {
        var feats = {};
        featurePrototypes = featurePrototypes || port.createFeaturePrototypeList();
        var D1 = featurePrototypes[0];
        $('#testdata').append('<div id="feat1"></div>');
        var feature1 = new D1();

        var D2 = featurePrototypes[1];
        $('#testdata').append('<div id="feat2"></div>');
        var feature2 = new D2();

        var D3 = featurePrototypes[2];
        $('#testdata').append('<div id="feat3"></div>');
        var feature3 = new D3();
        return [feature1, feature2, feature3];
    };

    port.createFeaturesProxyObject = function createFeaturesProxyObject(list) {
        var features = {},
            ret = {
                get: function(feature) {
                    if(_.has(features, feature)) {
                        return features[feature];
                    } else {
                        throw new Error("Feature " + feature + " not found");
                    }
                },
                getList: function() {
                    return _.keys(features);
                }
            };
        _.each(list, function(value) {
            ret[value.prototype.name] = value;
        });
        return ret;
    };

    return port;
});
