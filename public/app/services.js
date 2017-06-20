//PASSPORT

angular.module('webTestDB')
 
.service('AuthService', function($q, $http, API_ENDPOINT) {
  var LOCAL_TOKEN_KEY = 'WebAppToken';
  var LOCAL_RECHT     = 'WebAppRecht';
  var LOCAL_NAME      = 'WebAppName';
  var isAuthenticated = false;
  var authToken;
 
  function loadUserCredentials() {
    var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
    if (token) {
      useCredentials(token);
    }
  }

  var loadUserRecht = function () {
    var recht = window.localStorage.getItem(LOCAL_RECHT);
    return recht;
  }

  var loadUserName = function () {
    var name = window.localStorage.getItem(LOCAL_NAME);
    return name;
  }
 
  function storeUserCredentials(token, recht, name) {
    window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
    window.localStorage.setItem(LOCAL_RECHT, recht);
    window.localStorage.setItem(LOCAL_NAME, name);

    useCredentials(token);
  }
 
  function useCredentials(token) {
    isAuthenticated = true;
    authToken = token;
 
    // Set the token as header for your requests!
    $http.defaults.headers.common.Authorization = authToken;
  }
 
  function destroyUserCredentials() {
    authToken = undefined;
    isAuthenticated = false;
    $http.defaults.headers.common.Authorization = undefined;
    window.localStorage.removeItem(LOCAL_TOKEN_KEY);
    window.localStorage.removeItem(LOCAL_RECHT);
    window.localStorage.removeItem(LOCAL_NAME);

  }
 
  // var register = function(user) {
  //   return $q(function(resolve, reject) {
  //     $http.post(API_ENDPOINT.url + 'signup', user).then(function(result) {
  //       if (result.data.success) {
  //         resolve(result.data.msg);
  //       } else {
  //         reject(result.data.msg);
  //       }
  //     });
  //   });
  // };
 
  var login = function(user) {
    console.log('services.js LOGIN', user)
    return $q(function(resolve, reject) {
      $http.post(API_ENDPOINT.url + 'authenticate', user).then(function(result) {
        if (result.data.success) {
          storeUserCredentials(result.data.token, result.data.recht, result.data.name);
          resolve(result.data.msg);
        } else {
          reject(result.data.msg);
        }
      });
    });
  };
 
  var logout = function() {
    destroyUserCredentials();
  };
 
  loadUserCredentials();
 
  return {
    login: login,
    // register: register,
    logout: logout,
    loadUserRecht: loadUserRecht,
    loadUserName: loadUserName,
    isAuthenticated: function() {return isAuthenticated;},
  };
})
 
.factory('AuthInterceptor', function ($rootScope, $q, AUTH_EVENTS) {
  return {
    responseError: function (response) {
      $rootScope.$broadcast({
        401: AUTH_EVENTS.notAuthenticated,
      }[response.status], response);
      return $q.reject(response);
    }
  };
})
 
.config(function ($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');
});