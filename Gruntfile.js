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
                                'mock': '../doubles/mock'
                            }
                        }
                    }
                }
            }
        },
        jshint: {
            all: [
                'Gruntfile.js',
                'src/**/*.js',
                'spec/**/*.js'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('test', ['jshint', 'jasmine']);

    grunt.registerTask('default', ['test']);

};