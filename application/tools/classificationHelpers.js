define(['underscore', 'config', 'tools/eventmachine'], function(_, config, eventMachine) {
    "use strict";

    var sources,
        classificationHelpers = {
            name: 'classificationHelpers',

            getSource: function(query) {
                var queryParts = query.split("."),
                    sourceId = queryParts[0],
                    source = sources.get(sourceId);

                return source;
            },

            getClassification: function(query) {
                var source = classificationHelpers.getSource(query),
                    queryParts = query.split("."),
                    groupId = queryParts[1],
                    classificationId = queryParts[2],
                    group = source.groups.get(groupId);

                if(group !== undefined) {
                    var cl = group.classifications.find(function(classification) {
                        if(classification.get("id") === classificationId) {
                            return true;
                        }
                    });
                    if(cl !== undefined) {
                        return cl;
                    }
                }
                return null;
            },

            getClassifications: function(query) {
                var res = [];
                _.each(query, function(q) {
                    res.push(classificationHelpers.getClassification(q));
                });
                return res;
            },

            getClassificationName: function(query) {
                var cl = classificationHelpers.getClassification(query);
                if(cl !== null) {
                    return cl.get("name");
                }
                return null;
            },

            getClassificationClass: function(query) {
                var queryParts = query.split("."),
                    cid = queryParts[3],
                    cl = classificationHelpers.getClassification(query),
                    cClass = null;

                if(cl !== null) {
                    _.each(cl.get('classificationClasses'), function(classificationClass) {
                        var r = false;
                        if(classificationClass.cid === cid) {
                            cClass = classificationClass;
                            r = true;
                        }
                        return r;
                    });
                }

                return cClass;
            },

            getClassificationClassName: function(query) {
                var cl = classificationHelpers.getClassificationClass(query);
                if(cl !== null) {
                    return cl.value;
                }
                return null;
            }
        };

    eventMachine.subscribe('collection.sourcesLoaded', function(eventData) {
        sources = eventData.data;
    });

    return classificationHelpers;
});
