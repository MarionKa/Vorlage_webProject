angular.module('webTestDB')
    .controller('ListControllerRepos', ListControllerRepos)
    .controller('ListControllerReposUser', ListControllerReposUser)
    .controller('FormControllerRepoBenutzer', FormControllerRepoBenutzer)
    .controller('DeleteControllerRepos', DeleteControllerRepos);

ListControllerRepos.$inject = ['$state', 'dataFactoryRepos', 'dataFactoryRepo', 'dataFactoryOrga', 'AuthService'];
function ListControllerRepos ($state, dataFactoryRepos, dataFactoryRepo, dataFactoryOrga, AuthService) {
    var name = AuthService.loadUserName();
    document.getElementById("gruss").innerHTML = name;
    this.daten = dataFactoryRepos.getAll();       //getAll() in model.js (client) festgelegt

    this.generieren = function(){
            dataFactoryOrga.update().$promise.then($state.go.bind($state, 'admin.repoueber',{}, {reload: true}));
    }

    this.loeschen = function(){
            dataFactoryRepo.delete().$promise.then($state.go.bind($state, 'admin.repoueber'));
    } 
}

ListControllerReposUser.$inject = ['dataFactoryRepoUser', 'AuthService'];
function ListControllerReposUser (dataFactoryRepoUser, AuthService) {
    var name = AuthService.loadUserName();
    document.getElementById("gruss").innerHTML = name;
    this.daten = dataFactoryRepoUser.getAll();      //getAll() in model.js (client) festgelegt
}

FormControllerRepos.$inject = ['$state', '$stateParams', 'dataFactoryRepos'];
function FormControllerRepos ($state, $stateParams, dataFactoryRepos) {
    this.ART_ID =  '';
    this.AUTHNAME = '';
    this.REPONAME = '';
    this.ALLE_BENUTZER = '';
    this.GUELTIG_BIS = '';
    this.REPO_STATUS = '';
    this.ID = '';

        console.log('state FormControllerRepos');

    if($stateParams.id) {
        console.log('state2 ' + $stateParams.id);
        dataFactoryRepos.read({id: $stateParams.id}).$promise.then(function(daten) {
            console.log('daten im read ', daten[0].RECHTE_ID );
            this.ART_ID = daten[0].ART_ID;
            this.AUTHNAME = daten[0].AUTHNAME;
            this.REPONAME = daten[0].REPONAME;
            this.ALLE_BENUTZER = daten[0].ALLE_BENUTZER;
            this.GUELTIG_BIS = daten[0].GUELTIG_BIS;
            this.REPO_STATUS = daten[0].REPO_STATUS;
            this.ID = daten[0].ID;

        }.bind(this));
    }
}

FormControllerRepoBenutzer.$inject = ['$state', '$stateParams', 'dataFactoryRepos'];
function FormControllerRepoBenutzer ($state, $stateParams, dataFactoryRepos) {
        this.EMAILKENNUNG = '';
        this.id = $stateParams.id;
        console.log('state repoBen: ' + $stateParams.id);

    this.save = function () {
        console.log('save repoBen')
        var data = {
            EMAILKENNUNG: this.EMAILKENNUNG,
            REPOSITORY_ID: $stateParams.id
        };
            console.log('save create' + $stateParams.id);
            dataFactoryRepos.create(data).$promise.then($state.go('admin.repoedit', {id: $stateParams.id}));
        }.bind(this);
}

DeleteControllerRepos.$inject = ['$state', '$stateParams', 'dataFactoryRepos'];
function DeleteControllerRepos ($state, $stateParams, dataFactoryRepos) {
    dataFactoryRepos.delete({id: $stateParams.id}).$promise.then(function() {
        $state.go('admin.repoedit', {id: $stateParams.id});
    });
}

