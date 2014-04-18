define(function() {
    var doubles = {
        calculator: jasmine.createSpyObj('calculator', ['sum'])
    };

    define('double/calculator', function() {
        return doubles.calculator;
    });

    return doubles;
});