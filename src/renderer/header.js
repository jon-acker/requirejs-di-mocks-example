define(function() {

    return {
        parse: function(string) {
            var header = '######';
            var levels = header.length;
            var html = '';

            for (var level = levels; level > 0; level--) {
                if (string.indexOf(header.substring(0, level)) === 0) {
                    html = '<h' + level + '>' + string.substring(level) + '</h' + level +'>';
                    break;
                }
            }

            return html;
        }
    }
});