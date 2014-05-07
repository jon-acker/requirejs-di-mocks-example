module.exports = function(grunt) {
    'use strict';

    // Project configuration.
    grunt.initConfig({
        jasmine : {
            src : ['doubles/mock.js', 'src/**/*.js'],
            options : {
                keepRunner: true,
                specs : 'spec/**/*.js',
                template: require('grunt-template-jasmine-requirejs'),
                templateOptions: {
                    requireConfigFile: 'config.js',
                    requireConfig: {
                        map: {
                            '*': {
                                'mock': '../doubles/mock',
                                'dependencies': '../doubles/dependencies'
                            }
                        },
                        deps: ['dependencies']
                    }
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jasmine');

    grunt.registerTask('default', ['jasmine']);

};