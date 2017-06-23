webTestDB.controller("NavbarController", function ($scope, $location) {

    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };
   
});


// angular.module('webTestDB')
// webTestDB.controller("NavbarController", function ($scope, $location, AuthService) {

// NavbarController.$inject = ['AuthService'];
//     var recht = AuthService.loadUserRecht();


//     $scope.isActive = function (viewLocation) {
//         return viewLocation === $location.path();
//     };
   
// });