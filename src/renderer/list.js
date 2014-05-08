define(function() {
    return {
        parse: function(string) {
            return '<ul><li>' + string.substring(2) + '</li></ul>';

        }
    }
});