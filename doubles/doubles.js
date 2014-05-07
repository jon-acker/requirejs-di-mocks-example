define('double/calculator', function() {
    return jasmine.createSpyObj('calculator', ['sum']);
});

define('double/tokenizer', function() {
    return jasmine.createSpyObj('tokenizer', ['tokenize']);
});