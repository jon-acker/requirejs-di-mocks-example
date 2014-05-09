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
                                'collaborator/definer': '../doubles/collaborator/definer',
                                'mock': '../doubles/mock',
                                'collaborators': '../doubles/collaborators'
                            }
                        },
                        deps: [
                            'collaborators',
                            'collaborator/builder'
                        ],
                        callback: function(collaborators, collaboratorBuilder) {
                            require.config({
                                map: collaboratorBuilder.createDependencyMap(collaborators)
                            });
                        }
                    }
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jasmine');

    grunt.registerTask('default', ['jasmine']);

};