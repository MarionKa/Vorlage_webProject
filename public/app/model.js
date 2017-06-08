
angular.module('webTestDB')
.factory('dataFactoryBenutzer', dataFactoryBenutzer);

dataFactoryBenutzer.$inject = ['$resource'];

function dataFactoryBenutzer($resource) {
    return $resource(
        '/benutzer/:id',    //Alles zum Benutzer
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
.factory('dataFactoryRepostatus', dataFactoryRepostatus);

dataFactoryRepostatus.$inject = ['$resource'];

function dataFactoryRepostatus($resource) {
    return $resource(
        '/repostatus:id', //ALLE Status möglichkeiten
        {id: '@id'},
        {
            getAll: {method: 'GET', isArray: true}
        }
    );
}


angular.module('webTestDB')
.factory('dataFactoryRepos', dataFactoryRepos);

dataFactoryRepos.$inject = ['$resource'];

function dataFactoryRepos($resource) {
    return $resource(
        '/repos/:id',    //Mehrere Repository
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
        '/repo/:id',    //Ein Repository
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
        '/repoBenutzer/:id',    //Nutzer eines Repositorys
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
        '/art/:id',    //Arten- / Typen- Auswahl für Repositorys
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
        '/artAktiv/:id',    //Aktive Arten
        {id: '@id'},
        {
            getAll: {method: 'GET', isArray: true}
            // create: {method: 'POST'},
            // read: {method: 'GET', isArray: true},
            // update: {method: 'PUT'},
            // delete: {method: 'DELETE'}
        }
    );
}