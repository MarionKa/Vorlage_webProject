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

