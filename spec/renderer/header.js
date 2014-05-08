define(['renderer/header'], function(header) {

    describe('Header Renderer', function() {

        it('renders lines starting with one hash as html header H1', function() {
            expect(header.parse('#test')).toBe('<h1>test</h1>');
        });

        it('renders lines starting with two hashes as html header H2"', function() {
            expect(header.parse('##test')).toBe('<h2>test</h2>');
        });

        it('renders lines starting with three hashes as html header H3"', function() {
            expect(header.parse('###test')).toBe('<h3>test</h3>');
        });

        it('renders lines starting with six hashes as html header H6"', function() {
            expect(header.parse('######test')).toBe('<h6>test</h6>');
        });

    });
});