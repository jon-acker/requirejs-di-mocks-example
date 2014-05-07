define(function () {
    'use strict';

    var dependencies = require('dependencies');

    Object.keys(dependencies).forEach(function(moduleName) {
         dependencies[moduleName].forEach(function(requiredModule) {
             define('double/' + requiredModule, [requiredModule], function(module) {
                 return jasmine.createSpyObj(requiredModule, Object.keys(module));
             });

             dependencies[moduleName][requiredModule] = 'double/' + requiredModule;
        });
    });

    require.config({
        map: dependencies
    });

    return {
        load: function(requiredModule, req, load) {
            req(['double/' + requiredModule], function (module) {
                load(module);
            });
        }
    }

});