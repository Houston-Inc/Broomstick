// Tools are singletons to be shared among modules

define('tools', [
    'underscore',
    'tools/templatestorage',
    'tools/eventmachine',
    'tools/urls',
    'tools/classificationHelpers'
], function(_) {
    "use strict";

    var key, tools = {};

    _.each(arguments, function(value, key, list) {
        tools[list[key].name] = value;
    });

    return tools;

});
