define(function() {
    'use strict';

    var DOUBLES_PREFIX = 'double/';

    function _define(requiredModule) {
        define(DOUBLES_PREFIX + requiredModule, [requiredModule], function (module) {
            return jasmine.createSpyObj(requiredModule, Object.keys(module));
        });
    }

    function _createDependencyMap(collaborators) {
        var dependencyMap = {};

        Object.keys(collaborators).forEach(function(moduleName) {
            dependencyMap[moduleName] = dependencyMap[moduleName] || {};

            collaborators[moduleName].forEach(function(requiredModule) {
                _define(requiredModule);
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