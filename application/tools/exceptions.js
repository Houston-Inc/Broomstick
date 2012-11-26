define(['underscore', 'config'], function(_, config) {
    "use strict";

    var Exceptions = function(){},
        exceptions = new Exceptions(),
        exceptionList = [{
            name: 'FatalError',
            errorLevel: 'fatal'
        }];

    _.each(exceptionList, function(exception) {
        var MError = function(message) {
            this.getMessage = function() {
                return message;
            };
            this.getErrorLevel = function() {
                return this.errorLevel;
            };
        };
        MError.prototype = new Error();
        MError.prototype.errorLevel = exception.errorLevel;
        MError.name = exception.name;
        exceptions[exception.name] = MError;
    });

    if(config.DEBUG) {
        console.log(exceptions);
    }

    return exceptions;
});
