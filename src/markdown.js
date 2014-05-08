define(['renderer/list', 'renderer/header'], function(list, header) {

    return {

        parse: function parse(string) {
            var html;
            var match;

            if (!string || /^\W*$/.test(string)) {
                html = '';
            } else if (string.charAt(0) === '#') {
                html = header.parse(string);
            } else if (string.indexOf('* ') === 0) {
                html = list.parse(string);
            }

            return html;
        }
    }
});
