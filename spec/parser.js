define(['mock!calculator', 'parser'], function(calculator, parser) {

    describe('Parser', function() {

        it('parses a string', function() {

            expect(parser.parse('string')).toEqual(['s', 't', 'r', 'i', 'n', 'g']);

        });

        it('calculates a string', function() {

            calculator.sum.andReturn(6);

            expect(parser.calc('string')).toBe('string 6');
        });

        it('calculates a string again', function() {

            calculator.sum.andReturn(15);

            expect(parser.calc('string')).toBe('string 15');
        });

        xit('it measures the speed of a string', function() {

            speedometer.getSpeed.andReturn(6);

            expect(parser.measure('string')).toBe(6);
            expect(speedometer.setSpeed).toHaveBeenCalledWith(6);
        })
    })
})