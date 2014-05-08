define(['parser/markdown'], function(markdown) {

    describe('Markdown Rendered', function() {

        it('renders empty string given null input', function() {
            expect(markdown.parse(null)).toBe('');
        });

        it('renders empty string given empty input', function() {
            expect(markdown.parse('')).toBe('');
        });

        it('renders empty string given whitespace input', function() {
            expect(markdown.parse("  \t  ")).toBe('');
        });

        it('renders lines starting with one hash as html header H1', function() {
            expect(markdown.parse('#test')).toBe('<h1>test</h1>');
        });

        it('renders lines starting with two hashes as html header H3"', function() {
            expect(markdown.parse('##test')).toBe('<h2>test</h2>');
        });
        it('renders lines starting with three hashes as html header H3"', function() {
            expect(markdown.parse('###test')).toBe('<h3>test</h3>');
        });
    })
})