##Developing AMD modules in isolation

###Introduction

Since AMD has become something of a standard for loading, managing and splitting javascript into modules, it would be useful to have a simple way of developing those modules in isolation from each other, using dummy collaborators to stand in for real collaborations in those modules that have depdencies on other modules, which we do not want to test.

There are several mocking frameworks and libraries that allow us to do this, each using slightly different mechanisms. For example there is [Isolate](https://github.com/tnwinc/Isolate) (which required learning it specific syntax) and [Squire](https://github.com/iammerrick/Squire.js/), which introduces it own global keyword and syntax.

Nevertheless we can do his farily simply without using yet another framework, taking advantage of the fact that RequireJs is in fact a DI container, and the dependencies it provides can be switched through configuration.

###Specing a module that has no dependencies
I'll be using [Grunt] to provide a vaguely presentable jasmine runnner and a [grunt template] which renders the required HTML (which grunt will produce in _SpecRunner.html), this allows us to run the specs both in the browser and on the command line.

You'll need the grunt command line tool:
```
sudo npm install -g grunt-cli
```

Create a fresh directory to work in and switch to it, and create the file package.json:
```
{
  "name": "test-require",
  "version": "0.0.0",
  "main": "Gruntfile.js",
  "devDependencies": {
    "grunt": "~0.4.4",
    "grunt-template-jasmine-requirejs": "~0.1.10",
    "grunt-contrib-jasmine": "~0.5.3"
  }
}
```
(You need to lock down your grunt-template-jasmine-requirejs and grunt-contrib-jasmine to these specific versions until the conflict between grunt-template-jasmine-requirejs and newer versions of grunt-contrib-jasmine are resolved)

Run the command:
```
npm install
```
This should install all the dependencies for the project. Now running
```
grunt jasmine
```
or just
```
grunt
```
will run any specs found. Since there are none yet, it should produce:
> Warning: No specs executed

In order to create our first spec, we'll create a folder called spec/ and place in it a single javascript spec file: e.g. parser.js
```javascript
define(['parser'], function(parser) {
    describe('Parser module', function() {

        it('parses a string into letters', function() {
            expect(parser.parse('str')).toEqual(['s', 't', 'r']);
        });

    });
});
```

If we run grunt jasmine again, we should see:
> Error: scripterror: Illegal path or script error: ['parser']

The spec running is telling us that it can't find the parser module. So we'll now create another folder called src/, and place into it the file parser.js:
```javascript
define(function() {
    return {
        parse: function (string) {
            return string.split('');
        }
    }
});
```

Run grunt jasmine now, and the output should look like:
```
Testing jasmine specs via phantom
.
1 spec in 0s.
>> 0 failures
```

###Specing a module that has dependencies
The point of this article was to show a simple way of specing a module in isolation, using AMD, even when this module has dependencies, so at this point I'll be introducing a collaborator to our parser module, whose behaviour we want to mock, so that we can continue to work on the parser module without the distraction of having to write any of the implentation of its collaboarting module.

Imagine we want a new method on our parser, which can parse "token" (whatever that means), but we know that parsing tokens is probably a complex algorithm that we'd like to delegate to a collaborator called "tokenizer"

What we want require to do for us, is instead of providing our parser module with the real tokenizer dependency, we'd like it (in our test environment) to provide a dummy (in this case a jasmine, spy object) as a collaborator available for us to mock in our parser spec:
```javascript
define(['double/tokenizer', 'parser'], function(tokenizer, parser) {
    describe('Parser module', function() {

        it('parses a string into letters', function() {
            expect(parser.parse('str')).toEqual(['s', 't', 'r']);
        });

    });
});
```
If we run grunt jasmine, it will complain that it can't find the module "double/tokenizer". In order to provide our double to the spec, we'll take advantage of requirejs's custom mapping feature, and tell it to include our simple definition of this dummy collaborator:


```javascript
module.exports = function(grunt) {

    grunt.initConfig({
        jasmine : {
            src : ['doubles/doubles.js', 'src/**/*.js'],
            options : {
                keepRunner: true,
                specs : 'spec/**/*.js',
                template: require('grunt-template-jasmine-requirejs'),
                templateOptions: {
                    requireConfigFile: 'config.js',
                    requireConfig: {
                        map: {
                            'parser': {
                                'tokenizer': 'double/tokenizer'
                            }
                        }
                    }
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jasmine');

    grunt.registerTask('default', ['jasmine']);
};
```


