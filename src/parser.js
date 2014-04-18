define(['calculator', 'speedometer'], function(calculator, speedometer) {

    return {

        parse: function parse(string) {
            return string.split('');
        },

        calc: function calc(string) {
            var result = calculator.sum(2, 3);
            return string + ' ' + result;
        },

        measure: function measure(string) {
            speedometer.setSpeed(string.length);

            return speedometer.getSpeed();
        }
    }
});