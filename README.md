requirejs-di-mocks-example
==========================

Example of Requirejs Dependency Injection / Mocks

An example of how requirejs can be used as a DI container in order to provide jasmine spy objects in place of the required object to the objects-under-test.

Clone the project, then:

    sudo npm install -g grunt
    npm install
  
To run the specs:

    grunt jasmine 
  
To view the specs run in the browser, load the local file: _SpecRunner.html

Any module listed in mocks.js depdencies variable will have its specified dependencies replaced by a jasmine mock/spy, for example here we say that when the "parser" module requires its "calculator" module (as it does in src/parser.js) it will be receiving a dummy jasmine object, with the required modules' methods mocked.

In this included example, the "parser" module will require dummy "calculator" and "speedometer" objects:
```javascript
var dependencies = {
        parser: [
            'calculator',
            'speedometer'
        ],
        calculator: [
            'speedometer'
        ]
    };
```
