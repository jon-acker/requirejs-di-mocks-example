define(function() {
    var doubles = {};

    define('double/calculator', ['calculator'], function(calculator) {
        return doubles['calculator'] = jasmine.createSpyObj('calculator', Object.keys(calculator));
    });

    define('double/speedometer', ['speedometer'], function(speedometer) {
        return doubles['speedometer'] = jasmine.createSpyObj('speedometer', Object.keys(speedometer));
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