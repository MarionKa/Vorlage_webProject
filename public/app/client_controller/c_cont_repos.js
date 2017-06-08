angular.module('webTestDB')
    .controller('ListControllerRepos', ListControllerRepos)
    .controller('FormControllerRepoBenutzer', FormControllerRepoBenutzer)
    .controller('DeleteControllerRepos', DeleteControllerRepos);

ListControllerRepos.$inject = ['dataFactoryRepos'];
function ListControllerRepos (dataFactoryRepos) {
    this.daten = dataFactoryRepos.getAll();       //getAll() in model.js (client) festgelegt
}

FormControllerRepoBenutzer.$inject = ['$state', '$stateParams', 'dataFactoryRepos'];
function FormControllerRepoBenutzer ($state, $stateParams, dataFactoryRepos) {
        console.log('save dd');
        this.EMAILKENNUNG =  '';

    this.save = function () {
        console.log('save funktion')
        var data = {
            EMAILKENNUNG: this.EMAILKENNUNG,
            REPOSITORY_ID: $stateParams.id


        };
            console.log('save create' + $stateParams.id);
            dataFactoryRepos.create(data).$promise.then($state.go.bind($state, 'repoueber({id: $stateParams.id})'));
            //'benutzerueber' mit 'list' austauschen, damit list.html wieder funktioniert
        }.bind(this);
}

DeleteControllerRepos.$inject = ['$state', '$stateParams', 'dataFactoryRepos'];
function DeleteControllerRepos ($state, $stateParams, dataFactoryRepos) {
    dataFactoryRepos.delete({id: $stateParams.id}).$promise.then(function() {
        $state.go('repoueber');
    });
}

