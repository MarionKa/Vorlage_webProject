angular.module('webTestDB')
    .controller('ListControllerRepos', ListControllerRepos)
<<<<<<< HEAD
    .controller('ListControllerReposUser', ListControllerReposUser)
    .controller('FormControllerRepos', FormControllerRepos)
=======
    .controller('FormControllerRepoBenutzer', FormControllerRepoBenutzer)
>>>>>>> refs/remotes/origin/master
    .controller('DeleteControllerRepos', DeleteControllerRepos);

ListControllerRepos.$inject = ['dataFactoryRepos'];
function ListControllerRepos (dataFactoryRepos) {
    this.daten = dataFactoryRepos.getAll();       //getAll() in model.js (client) festgelegt
}

<<<<<<< HEAD
ListControllerReposUser.$inject = ['dataFactoryRepoUser'];
function ListControllerReposUser (dataFactoryRepoUser) {
    this.daten = dataFactoryRepoUser.getAll({id: $stateParams.id});      //getAll() in model.js (client) festgelegt
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

    // this.REPONAME = '';
    // this.AUTHNAME = '';
    // this.ART_ID = '';
    // this.REPO_STATUS_ID = '';

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

            // console.log('daten im read ', daten[0].REPONAME);
            // this.REPONAME = daten[0].REPONAME;
            // this.AUTHNAME = daten[0].AUTHNAME;
            // this.ART_ID = daten[0].ART_ID;
            // this.REPO_STATUS_ID = '1';
        }.bind(this));
    }
=======
FormControllerRepoBenutzer.$inject = ['$state', '$stateParams', 'dataFactoryRepos'];
function FormControllerRepoBenutzer ($state, $stateParams, dataFactoryRepos) {
        console.log('save dd');
        this.EMAILKENNUNG =  '';
>>>>>>> refs/remotes/origin/master

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

