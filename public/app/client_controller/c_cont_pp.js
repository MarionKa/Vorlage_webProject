angular.module('webTestDB')
 
.controller('LoginCtrl', function($scope, AuthService/*, $ionicPopup*/, $state) {
  $scope.user = {
    EMAILKENNUNG: '',
    PASSWORT: ''
  };
 
  $scope.login = function() {
    console.log('login bis hier')
    AuthService.login($scope.user).then(function(msg) {
      var recht = AuthService.loadUserRecht();
      console.log('recht ='+ recht)
      if (recht == 2)
        $state.go('benutzer.ueberpers')
      if (recht == 1)
        $state.go('admin.repoueber');
    }/*, function(errMsg) {
      var alertPopup = $ionicPopup.alert({
        title: 'Login failed!',
        template: errMsg
      });
    }*/);
  };
})
 
// .controller('RegisterCtrl', function($scope, AuthService, $ionicPopup, $state) {
//   $scope.user = {
//     name: '',
//     password: ''
//   };
 
//   $scope.signup = function() {
//     AuthService.register($scope.user).then(function(msg) {
//       $state.go('outside.login');
//       var alertPopup = $ionicPopup.alert({
//         title: 'Register success!',
//         template: msg
//       });
//     }, function(errMsg) {
//       var alertPopup = $ionicPopup.alert({
//         title: 'Register failed!',
//         template: errMsg
//       });
//     });
//   };
// })
 
// .controller('InsideCtrl', function($scope, AuthService, API_ENDPOINT, $http, $state) {
//   $scope.destroySession = function() {
//     AuthService.logout();
//   };
 
//   $scope.getInfo = function() {
//     $http.get(API_ENDPOINT.url + '/memberinfo').then(function(result) {
//       $scope.memberinfo = result.data.msg;
//     });
//   };
 
//   $scope.logout = function() {
//     AuthService.logout();
//     $state.go('outside.login');
//   };
// })
 
.controller('AppCtrl', function($scope, $state, /*$ionicPopup,*/ AuthService, AUTH_EVENTS) {
  $scope.$on(AUTH_EVENTS.notAuthenticated, function(event) {
    /*AuthService.logout();*/
    $state.go('ausgeloggt.anmeldung');
    /*var alertPopup = $ionicPopup.alert({
      title: 'Session Lost!',
      template: 'Sorry, You have to login again.'
    });*/
  });
});