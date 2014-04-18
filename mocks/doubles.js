define(function() {
    var doubles = {
        calculator: jasmine.createSpyObj('calculator', ['sum']),
        speedometer: jasmine.createSpyObj('speedometer', ['getSpeed', 'setSpeed'])
    };

    define('double/calculator', function() {
        return doubles.calculator;
    });

    define('double/speedometer', function() {
        return doubles.speedometer;
    });

    return doubles;
});