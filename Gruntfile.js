module.exports = function(grunt) {
    'use strict';

    // Project configuration.
    grunt.initConfig({
        jasmine : {
            src : ['src/**/*.js'],
            options : {
                keepRunner: true,
                specs : 'spec/**/*.js',
                template: require('grunt-template-jasmine-requirejs'),
                templateOptions: {
                    requireConfigFile: 'config.js',
                    requireConfig: {
                        map: {
                            '*': {
                                'collaborator/builder': '../doubles/collaborator/builder',
                                'mock': '../doubles/mock',
                                'collaborators': '../doubles/collaborators'
                            }
                        },
                        deps: ['collaborator/builder', 'collaborators', 'mock']
                    }
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jasmine');

    grunt.registerTask('default', ['jasmine']);

};