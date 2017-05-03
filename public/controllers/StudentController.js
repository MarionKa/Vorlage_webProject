// // Controller, der das DOM in der Übersicht des Studenten in PersönlichTemplate.html aktualisiert
// repoApp.controller("StudentController", function ($scope) {

//     // $scope.date = new Datum().dateString();
// });
angular.module('RepoDB')
.controller('StudentController',StudentController);

StudentController.$inject = ['dataFactory'];
function StudentController(dataFactory){
	this.repos = dataFactory.getAll();
}