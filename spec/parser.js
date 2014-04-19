define(['mocks/doubles', 'parser'], function(doubles, parser) {

    describe('Parser', function() {

        it('parses a string', function() {

            expect(parser.parse('string')).toEqual(['s', 't', 'r', 'i', 'n', 'g']);

        });

        it('calculates a string', function() {

            doubles.get('calculator').sum.andReturn(5);

            expect(parser.calc('string')).toBe('string 5');
        });

        it('calculates a string again', function() {

            doubles.get('calculator').sum.andReturn(15);

            expect(parser.calc('string')).toBe('string 15');
        });

        it('it measures the speed of a string', function() {

            doubles.get('speedometer').getSpeed.andReturn(6);

            expect(parser.measure('string')).toBe(6);
            expect(doubles.get('speedometer').setSpeed).toHaveBeenCalledWith(6);
        })
    })
})