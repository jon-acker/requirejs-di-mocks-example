require.config({
    baseUrl: 'src/',
    map: {
        '*': {
            'collaborator/builder': '../doubles/collaborator/builder',
            'collaborator/definer': '../doubles/collaborator/definer',
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
});

