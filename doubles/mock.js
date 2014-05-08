define(function () {
    'use strict';

    var collaborators = require('collaborators');
    var collaboratorBuilder = require('collaborator/builder');

    require.config({
        map: collaboratorBuilder.createDependencyMap(collaborators)
    });

    return {
        load: function(requiredModule, req, load) {
            req([collaboratorBuilder.DOUBLES_PREFIX + requiredModule], function (module) {
                load(module);
            });
        }
    }

});