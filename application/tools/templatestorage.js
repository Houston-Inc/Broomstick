define(['jquery', 'config'], function($, config) {
    "use strict";

    var $templates = $('<div id="root"></div>'),
        loaded = $.Deferred(),
        loading = false,

        templateStorage = {
            name: 'templateStorage',

            initialize: function() {
                if(!loading) {
                    loading = true;
                    var $temp = $('#templates');
                    $templates.append($temp.html());
                    loaded.resolve(true);
                }
            },
            get: function(selector, nounwrap) {
                var $element = $templates.find(selector);
                if(nounwrap) {
                    return $element.clone();
                }
                return $element.clone().contents();
            },
            render: function(selector, data) {
                return templateStorage.get(selector).render(data);
            },
            isResolved: function() {
                return loaded;
            }
        };

    return templateStorage;

});
