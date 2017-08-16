var webTestDB = angular.module('webTestDB', ['ui.router', 'ngResource'])
.config(configFn);

configFn.$inject = ['$stateProvider', '$urlRouterProvider'];

function configFn($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("ausgeloggt/anmeldung");

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
        url: "/deleteRepoBenutzer/:id/:REPOSITORY_ID",
        controller: 'DeleteControllerRepoBenutzer'
    })

// Definition der Nested States
    .state('ausgeloggt', {
        url: "/ausgeloggt",
        templateUrl: "app/partials/NavbarAusgeloggtTemplate.html",
    })

    .state('admin', {
        url: "/admin",
        templateUrl: "app/partials/NavbarAdminTemplate.html",
    })

    .state('benutzer', {
        url: "/benutzer",
        templateUrl: "app/partials/NavbarBenutzerTemplate.html",
    })

// Einbinden der funktionalen Templates mit Nested States
    .state('ausgeloggt.abmeldung', {
        url: "/abmeldung",
        templateUrl: "app/partials/AbmeldungTemplate.html"
    })

    .state('ausgeloggt.anmeldung', {
        url: "/anmeldung",
        templateUrl: "app/partials/AnmeldungTemplate.html",
        controller: 'LoginCtrl'
    })

    .state('ausgeloggt.kennwort', {
        url: "/kennwort",
        templateUrl: "app/partials/KennwortVergessenTemplate.html",
        controller: 'FormControllerPwVergessen',
        controllerAs: 'formControllerPwVergessen'
    })

    .state('ausgeloggt.registrierung', {
        url: "/registrierung",
        templateUrl: "app/partials/RegistrierungTemplate.html",
        controller: 'FormControllerBenutzer',
        controllerAs: 'formControllerBenutzer'
    })

    .state('ausgeloggt.reh', {
        url: "/reh",
        templateUrl: "app/partials/ErklaerungOeffentlichTemplate.html"
    })

    .state('admin.artedit', {
        url: "/artedit/:id",
        templateUrl: "app/partials/ArtEditierenTemplate.html",            
        controller: 'FormControllerArt', 
        controllerAs: 'formControllerArt'
    })

    .state('admin.arthinzu', {
        url: "/arthinzu",
        templateUrl: "app/partials/ArtHinzufuegenTemplate.html",            
        controller: 'FormControllerArt', 
        controllerAs: 'formControllerArt'
    })

    .state('admin.artueber', {
        url: "/artueber",
        templateUrl: "app/partials/ArtUebersichtTemplate.html",
        controller: 'ListControllerArt', 
        controllerAs: 'listControllerArt'
    })

    .state('admin.benutzeredit', {
        url: "/benutzeredit/:id",
        templateUrl: "app/partials/BenutzerEinzelansichtTemplate.html",
        controller: 'FormControllerBenutzer', 
        controllerAs: 'formControllerBenutzer'
    })

    .state('admin.benutzerentf', {
        url: "/benutzerentf/:id",
        templateUrl: "app/partials/BenutzerEntfernenTemplate.html",
        controller: 'ListControllerRepoBenutzer', 
        controllerAs: 'listControllerRepoBenutzer'
    })

    .state('admin.benutzerhinzu', {
        url: "/benutzerhinzu/:id",
        templateUrl: "app/partials/BenutzerHinzufuegenTemplate.html",
        controller: 'FormControllerRepoBenutzer',
        controllerAs: 'formControllerRepoBenutzer'
    })

    .state('admin.benutzerueber', {
        url: "/benutzerueber",
        templateUrl: "app/partials/BenutzerUebersichtTemplate.html",
        controller: 'ListControllerBenutzer', 
        controllerAs: 'listControllerBenutzer'
    })
    
    .state('admin.reh', {
        url: "/reh",
        templateUrl: "app/partials/ErklaerungAdminTemplate.html"
    })

    .state('admin.repoedit', {
        url: "/repoedit/:id",
        templateUrl: "app/partials/RepoEditierenTemplate.html",
        controller: 'FormControllerRepo',
        controllerAs: 'formControllerRepo'
    })

    .state('admin.repoerstellen', {
        url: "/repoerstellen",
        templateUrl: "app/partials/RepoHinzufuegenTemplate.html",
        controller: 'FormControllerRepo',
        controllerAs: 'formControllerRepo'
    })

    .state('admin.repoueber', {
        url: "/repoueber",
        templateUrl: "app/partials/RepoUebersichtTemplate.html",
        controller: 'ListControllerRepos',
        controllerAs: 'listControllerRepos'
    })  

    .state('benutzer.beantragung', {
        url: "/beantragung",
        templateUrl: "app/partials/BeantragungTemplate.html",
        controller: 'FormControllerRepobeantragen',
        controllerAs: 'formControllerRepobeantragen' 
    })

    .state('benutzer.reh', {
        url: "/reh",
        templateUrl: "app/partials/ErklaerungBenutzerTemplate.html"
    })

    .state('benutzer.ueberpers', {
        url: "/ueberpers",
        templateUrl: "app/partials/RepoPersUeTemplate.html",
        controller: 'ListControllerReposUser',
        controllerAs: 'listControllerReposUser'
    });

}

webTestDB.run(function ($rootScope, $state, AuthService, AUTH_EVENTS) {
  $rootScope.$on('$stateChangeStart', function (event,next, nextParams, fromState) {
    if (!AuthService.isAuthenticated()) {
     // console.log(next.name + ' ohne Token');
      if (next.name !== 'ausgeloggt.reh' && next.name !== 'ausgeloggt.anmeldung' && next.name !== 'ausgeloggt.abmeldung' && next.name !== 'ausgeloggt.registrierung' && next.name !== 'ausgeloggt.kennwort') {
        event.preventDefault();
        $state.go('ausgeloggt.anmeldung');
      }
    }
  });
});