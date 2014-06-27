##Developing AMD modules in isolation

###Introduction

Since AMD ([Asycronous Module Definition](http://en.wikipedia.org/wiki/Asynchronous_module_definition)) has become a de-facto standard for loading, managing and splitting javascript into modules, it would be useful to have a simple way of developing those modules in isolation from each other, using dummy collaborators to stand in for real collaborations in those modules that have dependencies on other modules, which we do not want to test.

There are several mocking frameworks and libraries that allow us to do this, each using slightly different mechanisms. For example there is [Isolate](https://github.com/tnwinc/Isolate) (which required learning it specific syntax) and [Squire](https://github.com/iammerrick/Squire.js/), which introduces it own global keyword and syntax.

Nevertheless we can do his fairly simply without using yet another framework, taking advantage of the fact that RequireJs is in fact a DI container, and the dependencies it provides can be switched through configuration.

###Specing a module that has no dependencies
I'll be using [Grunt] to provide a vaguely presentable jasmine runner and a [grunt template] which renders the required HTML (which grunt will produce in _SpecRunner.html), this allows us to run the specs both in the browser and on the command line.

You'll need the grunt command line tool:
```
sudo npm install -g grunt-cli
```

Create a fresh directory to work in and switch to it, and create the file package.json:
```
{
  "name": "mockist-tdd",
  "version": "0.0.0",
  "main": "Gruntfile.js",
  "devDependencies": {
    "grunt": "^0.4.5",
    "grunt-contrib-jasmine": "^0.6.5",
    "grunt-template-jasmine-requirejs": "^0.2.0",
    "jquery": "^2.1.1"
  }
}
```

Run the command:
```
npm install
```
This should install all the dependencies for the project.

You will need to create a configuration file for grunt, in the root directory, called Gruntfile.js:

```javascript
module.exports = function(grunt) {

    grunt.initConfig({
        jasmine : {
            src : [],
            options : {
                keepRunner: true,
                specs : 'spec/**/*.js',
                template: require('grunt-template-jasmine-requirejs'),
                templateOptions: {
                    requireConfig: {
                        baseUrl: 'src/'
                    }
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jasmine');

    grunt.registerTask('default', ['jasmine']);
};
```

Now running
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
The point of this article was to show a simple way of spec'ing a module in isolation, using AMD, even when this module has dependencies, so at this point I'll be introducing a collaborator to our parser module, whose behaviour we want to mock, so that we can continue to work on the parser module without the distraction of having to write any of the implementation of its collaborating module.

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
            src : [],
            options : {
                keepRunner: true,
                specs : 'spec/**/*.js',
                template: require('grunt-template-jasmine-requirejs'),
                templateOptions: {
                    requireConfig: {
                        baseUrl: 'src/',
                        map: {
                            'parser': {
                                'tokenizer': 'double/tokenizer'
                            }
                        },
                        deps: ['../doubles/doubles']
                    }
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jasmine');

    grunt.registerTask('default', ['jasmine']);
};
```

The "map" configuration options essentially tells requirejs that when "parser" requires "tokenizer", give it "double/tokenizer" instead.

We also need to define our dummy collaborators in the file doubles/doubles.js (which we've asked grunt-jasmine to process prior to any other files, using the "deps" configuraiton option)

In the folder doubles/ create a new file called doubles.js:
```javascript
define('double/tokenizer', function() {
    return jasmine.createSpyObj('tokenizer', ['tokenize']);
});
```

Here we are defining our double as a jasmine dummy with one method. And now our specs should run again with no errors.

In order to use this collaborator in our spec, lets write add a spec for our parser method that will actually use this collaborator:

```javascript
define(['double/tokenizer', 'parser'], function(tokenizer, parser) {
    describe('Parser module', function() {

        it('parses a string into letters', function() {
            expect(parser.parse('str')).toEqual(['s', 't', 'r']);
        });

        it('returns token found in the string', function() {
            expect(parser.parseTokens('{b} string {a}')).toEqual(['a', 'b']);
        });

    });
});
```

Predictably, our test runner will fail complaining that parser.parseTokens is undefined. Lets add this method to our parser module, pretending that our collaborating module "tokenizer" already exists:

```javascript
define(['tokenizer'], function(tokenizer) {
    return {
        parse: function (string) {
            return string.split('');
        },
        parseTokens: function (string) {
            return tokenizer.tokenize(string);
        }
    }
});
```

If we run grunt jasmine, we should now get the following failure message:
> Expected undefined to equal [ 'a', 'b' ]

The reason for this is that we have not yet stubbed any of our dummy's methods. This is now a simple task now that our collaborator has been provided and it follows jasmin's standard syntax, by adding the line:

```
tokenizer.tokenize.andReturn(['a', 'b']);
```

And to take advantage of the fact that our collaborator is a jasmine spy, we also add this line after our object-under-spec has executed the method in question.

```
expect(tokenizer.tokenize).toHaveBeenCalledWith('{b} string {a}');
```

This will confirm that our collaborators method was indeed called with the expected arguments.

The parser spec should now read as follows:

```javascript
define(['double/tokenizer', 'parser'], function(tokenizer, parser) {
    describe('Parser module', function() {

        it('parses a string into letters', function() {
            expect(parser.parse('str')).toEqual(['s', 't', 'r']);
        });

        it('returns token found in the string', function() {
            tokenizer.tokenize.andReturn(['a', 'b']);

            expect(parser.parseTokens('{b} string {a}')).toEqual(['a', 'b']);
            expect(tokenizer.tokenize).toHaveBeenCalledWith('{b} string {a}');
        });

    });
});
```

And now when we run the tests we should get:
```
Testing jasmine specs via phantom
..
2 specs in 0.001s.
>> 0 failures
```

##Using the module in the production environment
Requirejs can be instructed, on load, to run an initial module, often called main.js. Your index.html needs to read as follows:
```
<script src="node_modules/grunt-template-jasmine-requirejs/vendor/require-2.1.10.js" data-main="main.js"></script>
```

And main.js, which resides in the root folder, might contain:
```javascript
require.config({
    baseUrl: 'src/'
});

define(['parser'], function(parser) {
    console.log(parser.parseTokens('{a} string {d} blah {b} {c}'));
});
```

If you load the file index.html into your browser, you'll see an error effectively telling you that the tokenizer module doesn't exist - since so far it has only been mocked!

In the folder src/, create a new file called tokenizer.js, which will contain an implementation for the tokenizer module:
```javascript
define(function() {
   return {
       tokenize: function (string) {
            return string.match(/\{(\w)\}/g);
       }
   }
});
```

##Taking it further and simplifying the process

Its possible to get rid of much of the boilder-plate code surrounding the definitions of the collaborators and the mappings can be automated. I've started writing a requirejs plugin called "collaborator" to do just this, bear in mind this is a work in progress:
https://github.com/jon-acker/collaborator

