define(['mock!renderer/header', 'mock!renderer/list', 'markdown'], function(header, list, markdown) {

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

        it('renders header lines using the header renderer', function() {
            header.parse.andReturn('<h2> blah</h2>');

            expect(markdown.parse('## blah')).toBe('<h2> blah</h2>');
            expect(header.parse).toHaveBeenCalledWith('## blah');
        });

        it('renders uo list lines using the uo list renderer', function() {
            list.parse.andReturn('<ul><li>blah</li></ul>');

            expect(markdown.parse('* blah')).toBe('<ul><li>blah</li></ul>');
            expect(list.parse).toHaveBeenCalledWith('* blah');
        });
    });
});