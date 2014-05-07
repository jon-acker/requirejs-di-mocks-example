define(['tokenizer'], function(tokenizer) {

    return {

        parse: function parse(string) {
            return string.split('');
        },

        parseTokens: function parseTokens(string) {
            if ('' === string) {
                throw ('parseTokens: cannot parse an empty string');
            }
            return tokenizer.tokenize(string);
        }
    }
});