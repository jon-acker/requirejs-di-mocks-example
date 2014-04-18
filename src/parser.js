define(['calculator'], function(calculator) {

    return {

        parse: function parse(string) {
            return string.split('');
        },

        calc: function calc(string) {
            var result = calculator.sum(2, 3);
            return string + ' ' + result;
        }
    }
});