define(['double/tokenizer', 'parser'], function(tokenizer, parser) {

    describe('Parser', function() {

        it('parses a string', function() {

            expect(parser.parse('string')).toEqual(['s', 't', 'r', 'i', 'n', 'g']);

        });

        it('throws an error when given a empty string', function() {
            expect(function() {
                parser.parseTokens('');
            }).toThrow('parseTokens: cannot parse an empty string');
        });

        it('parses a string into tokens', function() {

            tokenizer.tokenize.andReturn(['a', 'b']);

            expect(parser.parseTokens('{b} string {a}')).toEqual(['a', 'b']);
            expect(tokenizer.tokenize).toHaveBeenCalledWith('{b} string {a}');
        });

    })
})
