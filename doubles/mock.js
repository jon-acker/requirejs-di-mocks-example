define(function () {
    'use strict';

    var collaboratorBuilder = require('collaborator/builder');
    var collaborators = require('collaborators');

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