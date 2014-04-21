define(function() {
    var doubles = {};
    var modules = ['calculator', 'speedometer'];

    modules.forEach(function(moduleName) {
        define('double/' + moduleName, [moduleName], function(module) {
            return doubles[moduleName] = jasmine.createSpyObj(moduleName, Object.keys(module));
        });
    });

    require.config({
        map: {
            parser: {
                calculator: 'double/calculator',
                speedometer: 'double/speedometer'
            }
        }
    });

    return {
        get: function (moduleName) {
            return doubles[moduleName];
        }
    };
});