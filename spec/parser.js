define(['mocks/doubles', 'parser'], function(doubles, parser) {

    describe('Parser', function() {

        it('parses a string', function() {

            expect(parser.parse('string')).toEqual(['s', 't', 'r', 'i', 'n', 'g']);

        });

        it('calculates a string', function() {

            doubles.calculator.sum.andReturn(5);

            expect(parser.calc('string')).toBe('string 5');
        });
    })
})