define(['renderer/list'], function(list) {

    describe('List Renderer', function() {

        it('renders lines starting with asterisk_space as unordered list', function() {
            expect(list.parse('* test')).toBe('<ul><li>test</li></ul>')
        });

    });
});