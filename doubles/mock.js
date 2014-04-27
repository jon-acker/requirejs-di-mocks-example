define(function () {
    var dependencies = {
        parser: [
            'calculator',
            'speedometer'
        ],
        calculator: [
            'speedometer'
        ]
    };

    Object.keys(dependencies).forEach(function(moduleName) {
         dependencies[moduleName].forEach(function(requiredModule) {
             define('double/' + requiredModule, [requiredModule], function(module) {
                 return jasmine.createSpyObj(requiredModule, Object.keys(module));
             });

             dependencies[moduleName][requiredModule] = 'double/' + requiredModule;
        });
    });

    var context = require.config({
        map: dependencies
    });

    return {
        load: function(requiredModule, req, load, config) {
            console.log('loading: ' + requiredModule);
            req(['double/' + requiredModule], function (module) {
                load(module);
            });
        }
    }

});