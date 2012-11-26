define(['underscore.string'], function(_) {
    "use strict";

    var exp = {
        name: 'urls'
    };

    function sanitizeToURL(uiName) {
        return _.slugify(uiName);
    }
    exp.sanitizeToURL = sanitizeToURL;
    return exp;
});
