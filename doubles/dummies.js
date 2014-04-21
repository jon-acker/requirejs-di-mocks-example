define(function() {

    var doubles = {};
    var dependencies = {
        parser: {
            calculator: '',
            speedometer: ''
        },
        calculator: {
            speedometer: ''
        }
    };

    Object.keys(dependencies).forEach(function(moduleName) {
        Object.keys(dependencies[moduleName]).forEach(function(dependencyName) {
            dependencies[moduleName][dependencyName] = 'double/' + dependencyName;
            define(dependencies[moduleName][dependencyName], [dependencyName], function(dependency) {
                return doubles[dependencyName] = jasmine.createSpyObj(dependencyName, Object.keys(dependency));
            });
        });
    });

    require.config({
        map: dependencies
    });

    return {
        get: function (dependencyName) {
            return doubles[dependencyName];
        }
    };
});