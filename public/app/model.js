
var webDB = angular.module('webTestDB')

webDB.factory('dataFactoryBenutzer', dataFactoryBenutzer);

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


webDB.factory('dataFactoryRepostatus', dataFactoryRepostatus);

dataFactoryRepostatus.$inject = ['$resource'];

function dataFactoryRepostatus($resource) {
    return $resource(
        '/repostatus/:id', //ALLE Status möglichkeiten; Schrägstrich hinzugefügt.
        {id: '@id'},
        {
            getAll: {method: 'GET', isArray: true}
        }
    );
}


webDB.factory('dataFactoryRepos', dataFactoryRepos);

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



webDB.factory('dataFactoryRepo', dataFactoryRepo);

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

// Neu angelegt. ALLE Repositories für EINEN Benutzer
webDB.factory('dataFactoryRepoUser', dataFactoryRepoUser);

dataFactoryRepoUser.$inject = ['$resource'];

function dataFactoryRepoUser($resource) {
    return $resource(
        '/meineRepos/:id',    //Ein Repository
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

// Für alle Nutzer aus einem Repository (Benötigt für Benutzer entfernen)
webDB.factory('dataFactoryRepoBenutzer', dataFactoryRepoBenutzer);
dataFactoryRepoBenutzer.$inject = ['$resource'];

function dataFactoryRepoBenutzer($resource) {
    return $resource(
        '/repoBenutzer/:id/:ID_REPO',    //Nutzer eines Repositorys
        {id: '@id'},
        {
            getAll: {method: 'GET', isArray: true},
            create: {method: 'POST'},
            // read: {method: 'GET', isArray: true},
            update: {method: 'PUT'},
            delete: {method: 'DELETE'}
        }
    );
}


webDB.factory('dataFactoryArt', dataFactoryArt);

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

// Zur Erstellung eines neuen Repositories ('repoerstellen')
webDB.factory('dataFactoryRepoBeantragen', dataFactoryRepoBeantragen);

dataFactoryRepoBeantragen.$inject = ['$resource'];

function dataFactoryRepoBeantragen($resource) {
    return $resource(
        '/repoErstellen',
        {id: '@id'},
        {
            // getAll: {method: 'GET', isArray: true},
            create: {method: 'POST'}//,
            // read: {method: 'GET', isArray: true},
            // update: {method: 'PUT'},
            // delete: {method: 'DELETE'}
        }
    );
}

webDB.factory('dataFactoryArtAktiv', dataFactoryArtAktiv);

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