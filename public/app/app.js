var webTestDB = angular.module('webTestDB', ['ui.router', 'ngResource'])
.config(configFn);

configFn.$inject = ['$stateProvider', '$urlRouterProvider'];

function configFn($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/list");

    $stateProvider
    .state('list', {
        url: "/list",
        templateUrl: "app/partials/list.html",
        controller: 'ListController', 
        controllerAs: 'listController'
    })
    .state('form', {
        url: "/form/:id",
        templateUrl: "app/partials/form.html",
        controller: 'FormController',
        controllerAs: 'formController'
    })
    .state('delete', {
        url: "/delete/:id",
        controller: 'DeleteController'
    })

    .state('deleteBenutzer', {
        url: "/delete/:id",
        controller: 'DeleteControllerBenutzer'
    })

    .state('deleteArt', {
        url: "/delete/:id",
        controller: 'DeleteControllerArt'
    })

    .state('deleteRepos', {
        url: "/delete/:id",
        controller: 'DeleteControllerRepos'
    })

    .state('abmeldung', {
        url: "/abmeldung",
        templateUrl: "app/partials/AbmeldungTemplate.html"
    })
    .state('anmeldung', {
        url: "/anmeldung",
        templateUrl: "app/partials/AnmeldungTemplate.html"
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
        templateUrl: "app/partials/BeantragungTemplate.html"
    })
    .state('benutzeredit', {
        url: "/benutzeredit/:id",
        templateUrl: "app/partials/BenutzerEinzelansichtTemplate.html",
        controller: 'FormControllerBenutzer', 
        controllerAs: 'formControllerBenutzer'
    })
    .state('benutzerentf', {
        url: "/benutzerentf/:id",
        templateUrl: "app/partials/BenutzerEntfernenTemplate.html",
        controller: 'FormControllerRepo', 
        controllerAs: 'formControllerRepo'
    })
    .state('benutzerhinzu', {
        url: "/benutzerhinzu",
        templateUrl: "app/partials/BenutzerHinzufügenTemplate.html"
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
        templateUrl: "app/partials/RegistrierungTemplate.html"
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
    .state('repoueber', {
        url: "/repoueber",
        templateUrl: "app/partials/RepoUebersichtTemplate.html",
        controller: 'ListControllerRepos',
        controllerAs: 'listControllerRepos'
    })
    .state('ueberpers', {
        url: "/ueberpers",
        templateUrl: "app/partials/RepoPersUeTemplate.html"
    });

}