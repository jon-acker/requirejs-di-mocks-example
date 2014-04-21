define(['doubles/dummies', 'parser'], function(doubles, parser) {

    describe('Parser', function() {

        it('returns an empty array given no input', function() {
            expect(parser.parse()).toEqual([]);
        });

        it('returns an empty array given empty input', function() {
            expect(parser.parse('')).toEqual([]);
        });

        it('returns an empty array given spaces input', function() {
            expect(parser.parse('   ')).toEqual([]);
        });

        it('returns an array with one word given one word', function() {
            expect(parser.parse('blah')).toEqual(['blah']);
        });

        it('returns an array with n words given n words', function() {
            expect(parser.parse('blah1 blah2')).toEqual(['blah1', 'blah2']);
        });

        it('returns an array with n words given n words separated by spaces', function() {
            expect(parser.parse( 'blah1   blah2 ')).toEqual(['blah1', 'blah2']);
        })
    })
})