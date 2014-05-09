define(function() {
    'use strict';

    var DOUBLES_PREFIX = 'double/';

    function _define(requiredModule, methods) {
        define(DOUBLES_PREFIX + requiredModule, function () {
            return jasmine.createSpyObj(requiredModule, methods);
        });
    }

    function _createDependencyMap(collaborators) {
        var dependencyMap = {};

        Object.keys(collaborators).forEach(function(moduleName) {
            dependencyMap[moduleName] = dependencyMap[moduleName] || {};

            Object.keys(collaborators[moduleName]).forEach(function(requiredModule) {
                var methods = collaborators[moduleName][requiredModule];
                _define(requiredModule, methods);
                dependencyMap[moduleName][requiredModule] = DOUBLES_PREFIX + requiredModule;
            });
        });

        return dependencyMap;
    }


    return {
        createDependencyMap: function(collaborators) {
            return _createDependencyMap(collaborators);
        },
        DOUBLES_PREFIX: DOUBLES_PREFIX
    }
});