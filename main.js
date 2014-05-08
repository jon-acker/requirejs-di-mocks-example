require.config({
    baseUrl: 'src/'
});

define(['calculator'], function(calculator) {
    console.log(calculator.sum(4, 5));
});
