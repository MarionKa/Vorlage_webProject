webTestDB.controller("BodyController", function ($scope,AuthService) {

    // $scope.date = new Datum().dateString();
    $scope.logout = function() {
    	console.log('LOGOUT');
    	AuthService.logout();

    };
});