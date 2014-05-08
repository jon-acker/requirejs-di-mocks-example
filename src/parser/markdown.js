define(function() {

    return {

        parse: function parse(string) {
            var html;
            var match;

            if (!string || /^\W*$/.test(string)) {
                html = '';
            } else if (match = string.match(/###([^#]*)/g)) {
                html= '<h3>' + string.substring(3) + '</h3>';
            } else if (string.match(/##([^#]*)/g)) {
                html= '<h2>' + string.substring(2) + '</h2>';
            } else if (string.match(/#([^#]*)/g)) {
                html= '<h1>' + string.substring(1) + '</h1>';
            }

            return html;
        }
    }
});
