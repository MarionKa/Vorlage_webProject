var webTestDB = angular.module('webTestDB', ['ui.router', 'ngResource'])
.config(configFn);

configFn.$inject = ['$stateProvider', '$urlRouterProvider'];

function configFn($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/anmeldung");

    $stateProvider
    .state('deleteBenutzer', {
        url: "/deleteBenutzer/:id",
        controller: 'DeleteControllerBenutzer'
    })

    .state('deleteArt', {
        url: "/deleteArt/:id",
        controller: 'DeleteControllerArt'
    })

    .state('deleteRepos', {
        url: "/deleteRepos/:id",
        controller: 'DeleteControllerRepos'
    })

    .state('deleteRepoBenutzer', {
        url: "/deleteRepoBenutzer/:id  /:REPOSITORY_ID",
        controller: 'DeleteControllerRepoBenutzer'
    })

    .state('abmeldung', {
        url: "/abmeldung",
        templateUrl: "app/partials/AbmeldungTemplate.html"
    })
    .state('anmeldung', {
        url: "/anmeldung",
        templateUrl: "app/partials/AnmeldungTemplate.html",
        controller: 'LoginCtrl'
    })
    .state('artedit', {
        url: "/artedit/:id",
        templateUrl: "app/partials/ArtEditierenTemplate.html",            
        controller: 'FormControllerArt', 
        controllerAs: 'formControllerArt'
    })
    .state('arthinzu', {
        url: "/arthinzu",
        templateUrl: "app/partials/ArtHinzufügenTemplate.html",            
        controller: 'FormControllerArt', 
        controllerAs: 'formControllerArt'
    })
    .state('artueber', {
        url: "/artueber",
        templateUrl: "app/partials/ArtUebersichtTemplate.html",
        controller: 'ListControllerArt', 
        controllerAs: 'listControllerArt'
    })
    .state('beantragung', {
        url: "/beantragung",
        templateUrl: "app/partials/BeantragungTemplate.html",
        controller: 'FormControllerRepobeantragen',
        controllerAs: 'formControllerRepobeantragen' 
    })
    .state('benutzeredit/:id', {  //Hier was geändert
        url: "/benutzeredit/:id",
        templateUrl: "app/partials/BenutzerEinzelansichtTemplate.html",
        controller: 'FormControllerBenutzer', 
        controllerAs: 'formControllerBenutzer'
    })
    .state('benutzerentf', {
        url: "/benutzerentf/:id",
        templateUrl: "app/partials/BenutzerEntfernenTemplate.html",
        controller: 'ListControllerRepoBenutzer', 
        controllerAs: 'listControllerRepoBenutzer'
    })
    .state('benutzerhinzu', {
        url: "/benutzerhinzu/:id",
        templateUrl: "app/partials/BenutzerHinzufügenTemplate.html",
        controller: 'FormControllerRepoBenutzer',
        controllerAs: 'formControllerRepoBenutzer'
    })
    .state('benutzerueber', {
        url: "/benutzerueber",
        templateUrl: "app/partials/BenutzerUebersichtTemplate.html",
        controller: 'ListControllerBenutzer', 
        controllerAs: 'listControllerBenutzer'
    })
    .state('kennwort', {
        url: "/kennwort",
        templateUrl: "app/partials/KennwortVergessenTemplate.html"
    })
    .state('registrierung', {
        url: "/registrierung",
        templateUrl: "app/partials/RegistrierungTemplate.html",
        controller: 'FormControllerBenutzer',
        controllerAs: 'formControllerBenutzer'
    })
    .state('reh', {
        url: "/reh",
        templateUrl: "app/partials/ErklaerungTemplate.html"
    })
    .state('repoedit', {
        url: "/repoedit/:id",
        templateUrl: "app/partials/RepoEditierenTemplate.html",
        controller: 'FormControllerRepo',
        controllerAs: 'formControllerRepo'
    })
    .state('repoerstellen', {
        url: "/repoerstellen",
        templateUrl: "app/partials/RepoHinzufügenTemplate.html",
        controller: 'FormControllerRepo',
        controllerAs: 'formControllerRepo'
    })
    .state('repoueber', {
        url: "/repoueber",
        templateUrl: "app/partials/RepoUebersichtTemplate.html",
        controller: 'ListControllerRepos',
        controllerAs: 'listControllerRepos'
    })
    .state('ueberpers', {
        url: "/ueberpers",
        templateUrl: "app/partials/RepoPersUeTemplate.html",
        controller: 'ListControllerReposUser',
        controllerAs: 'listControllerReposUser'
        
    });

}

webTestDB.run(function ($rootScope, $state, AuthService, AUTH_EVENTS) {
  $rootScope.$on('$stateChangeStart', function (event,next, nextParams, fromState) {
    if (!AuthService.isAuthenticated()) {
      console.log(next.name + ' ohne Token');
      if (next.name !== 'reh' && next.name !== 'anmeldung' && next.name !== 'abmeldung' && next.name !== 'registrierung' && next.name !== 'kennwort') {
        event.preventDefault();
        $state.go('anmeldung');
      }
    }
  });
});