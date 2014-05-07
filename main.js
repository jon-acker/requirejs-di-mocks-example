require.config({
    baseUrl: 'src/'
});

define(['parser'], function(parser) {
    console.log(parser.parseTokens('{a} string {d} blah {b} {c}'));
});
