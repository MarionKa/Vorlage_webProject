angular.module('webTestDB')
.factory('dataFactory', dataFactory);

dataFactory.$inject = ['$resource'];

function dataFactory($resource) {
    return $resource(
        '/benutzer/:id',    //Zum testen hier ändern; Schnittstelle Client-Server
        {id: '@id'},
        {
            getAll: {method: 'GET', isArray: true},
            create: {method: 'POST'},
            read: {method: 'GET', isArray: true},
            update: {method: 'PUT'},
            delete: {method: 'DELETE'}
        }
    );
}


/////////// Für unsere Webapp ////////////////////


angular.module('webTestDB')
.factory('dataFactoryBenutzer', dataFactoryBenutzer);

dataFactoryBenutzer.$inject = ['$resource'];

function dataFactoryBenutzer($resource) {
    return $resource(
        '/benutzer/:id',    //Zum testen hier ändern; Schnittstelle Client-Server
        {id: '@id'},
        {
            getAll: {method: 'GET', isArray: true},
            create: {method: 'POST'},
            read: {method: 'GET', isArray: true},
            update: {method: 'PUT'},
            delete: {method: 'DELETE'}
        }
    );
}


angular.module('webTestDB')
.factory('dataFactoryRepos', dataFactoryRepos);

dataFactoryRepos.$inject = ['$resource'];

function dataFactoryRepos($resource) {
    return $resource(
        '/repos/:id',    //Zum testen hier ändern; Schnittstelle Client-Server
        {id: '@id'},
        {
            getAll: {method: 'GET', isArray: true},
            create: {method: 'POST'},
            read: {method: 'GET', isArray: true},
            update: {method: 'PUT'},
            delete: {method: 'DELETE'}
        }
    );
}



angular.module('webTestDB')
.factory('dataFactoryRepo', dataFactoryRepo);

dataFactoryRepo.$inject = ['$resource'];

function dataFactoryRepo($resource) {
    return $resource(
        '/repo/:id',    //Zum testen hier ändern; Schnittstelle Client-Server
        {id: '@id'},
        {
            getAll: {method: 'GET', isArray: true},
            create: {method: 'POST'},
            read: {method: 'GET', isArray: true},
            update: {method: 'PUT'},
            delete: {method: 'DELETE'}
        }
    );
}

angular.module('webTestDB')
.factory('dataFactoryRepoBenutzer', dataFactoryRepoBenutzer);

dataFactoryRepoBenutzer.$inject = ['$resource'];

function dataFactoryRepoBenutzer($resource) {
    return $resource(
        '/repoBenutzer/:id',    //Zum testen hier ändern; Schnittstelle Client-Server
        {id: '@id'},
        {
            getAll: {method: 'GET', isArray: true},
            // create: {method: 'POST'},
            // read: {method: 'GET', isArray: true},
            // update: {method: 'PUT'},
            delete: {method: 'DELETE'}
        }
    );
}


angular.module('webTestDB')
.factory('dataFactoryArt', dataFactoryArt);

dataFactoryArt.$inject = ['$resource'];

function dataFactoryArt($resource) {
    return $resource(
        '/art/:id',    //Zum testen hier ändern; Schnittstelle Client-Server
        {id: '@id'},
        {
            getAll: {method: 'GET', isArray: true},
            create: {method: 'POST'},
            read: {method: 'GET', isArray: true},
            update: {method: 'PUT'},
            delete: {method: 'DELETE'}
        }
    );
}

angular.module('webTestDB')
.factory('dataFactoryArtAktiv', dataFactoryArtAktiv);

dataFactoryArtAktiv.$inject = ['$resource'];

function dataFactoryArtAktiv($resource) {
    return $resource(
        '/artAktiv/:id',    //Zum testen hier ändern; Schnittstelle Client-Server
        {id: '@id'},
        {
            getAll: {method: 'GET', isArray: true},
            create: {method: 'POST'},
            read: {method: 'GET', isArray: true},
            update: {method: 'PUT'},
            delete: {method: 'DELETE'}
        }
    );
}