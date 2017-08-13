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
 

.controller('AppCtrl', function($scope, $state, /*$ionicPopup,*/ AuthService, AUTH_EVENTS) {
  $scope.$on(AUTH_EVENTS.notAuthenticated, function(event) {
    $state.go('ausgeloggt.anmeldung');
    /*var alertPopup = $ionicPopup.alert({
      title: 'Session Lost!',
      template: 'Sorry, You have to login again.'
    });*/
  });
});