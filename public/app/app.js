angular.module('webTestDB', ['ui.router', 'ngResource'])
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
            url: "/benutzerentf",
            templateUrl: "app/partials/BenutzerEntfernenTemplate.html"
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
            url: "/repoedit",
            templateUrl: "app/partials/RepoEditierenTemplate.html"
        })
        .state('repoueber', {
            url: "/repoueber",
            templateUrl: "app/partials/RepoUebersichtTemplate.html"
        })
        .state('ueberpers', {
            url: "/ueberpers",
            templateUrl: "app/partials/RepoPersUeTemplate.html"
        });

}