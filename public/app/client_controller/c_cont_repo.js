angular.module('webTestDB')
    .controller('ListControllerRepo', ListControllerRepo)
    .controller('ListControllerRepoBenutzer', ListControllerRepoBenutzer)
    .controller('FormControllerRepo', FormControllerRepo)
    .controller('DeleteControllerRepo', DeleteControllerRepo);

ListControllerRepo.$inject = ['dataFactoryRepo'];
function ListControllerRepo (dataFactoryRepo) {
    this.test = dataFactoryRepo.getAll();       //getAll() in model.js (client) festgelegt
}

ListControllerRepoBenutzer.$inject = ['$state', '$stateParams','dataFactoryRepoBenutzer'];
function ListControllerRepoBenutzer ($state, $stateParams,dataFactoryRepoBenutzer) {
    this.test = dataFactoryRepoBenutzer.getAll({id: $stateParams.id});       //getAll() in model.js (client) festgelegt
}

FormControllerRepo.$inject = ['$state', '$stateParams', 'dataFactoryRepo'];
function FormControllerRepo ($state, $stateParams, dataFactoryRepo) {
    this.ART_ID = '';
    this.AUTHNAME = '';
    this.REPONAME = '';
    this.ALLE_BENUTZER = '';
    this.GUELTIG_BIS = '';
    this.REPO_STATUS_ID = '';
    this.ID = '';
console.log('einstieg: ' + this.AUTHNAME)
    // this.REPONAME = '';
    // this.AUTHNAME = '';
    // this.ART_ID = '';
    // this.REPO_STATUS_ID = '';

        console.log('Aktueller state: FormControllerRepo');

//var testing;

    if($stateParams.id) {
        console.log('SHOW stateParams.id: ' + $stateParams.id);
        dataFactoryRepo.read({id: $stateParams.id}).$promise.then(function(test) {
            console.log('stateParams IN FKT ', test[0].ID);
            this.ART_ID = test[0].ART_ID;
            this.AUTHNAME = test[0].AUTHNAME;
            this.REPONAME = test[0].REPONAME;
            this.ALLE_BENUTZER = test[0].ALLE_BENUTZER;
            this.GUELTIG_BIS = test[0].GUELTIG_BIS;
            this.REPO_STATUS_ID = test[0].REPO_STATUS_ID;
            this.ID = test[0].ID;

            //testing = test;
            // console.log('test im read ', test[0].REPONAME);
            // this.REPONAME = test[0].REPONAME;
            // this.AUTHNAME = test[0].AUTHNAME;
            // this.ART_ID = test[0].ART_ID;
            // this.REPO_STATUS_ID = '1';
        }.bind(this));
        console.log('AUSGABE IN FKT: ', this.ART_ID);
    }
         console.log('AUSGABE NACH FKT: ', this.ART_ID);

    this.save = function () {
        console.log('save repo: '+ this.AUTHNAME +' '+ this.REPONAME +' ' + this.BENUTZERNAMEN);

        var data = {
            ART_ID: this.ART_ID,
            AUTHNAME: this.AUTHNAME,
            REPONAME: this.REPONAME,
            GUELTIG_BIS: this.GUELTIG_BIS,
            REPO_STATUS_ID: this.REPO_STATUS_ID_NEU,
            ID: this.ID

            // REPONAME: maka,
            // AUTHNAME: kaiserma,
            // ART_ID: 1,
            // REPO_STATUS_ID: '1'

        };
        if ($stateParams.id) {
            console.log('save update');
            data.id = $stateParams.id;
            dataFactoryRepo.update(data).$promise.then($state.go.bind($state, 'repoueber'));
            //'benutzerueber' mit 'list' austauschen, damit list.html wieder funktioniert
        } else {
            console.log('save create');
            dataFactoryRepo.create(data).$promise.then($state.go.bind($state, 'repoueber'));
            //'benutzerueber' mit 'list' austauschen, damit list.html wieder funktioniert
        }
    }.bind(this);
}

DeleteControllerRepo.$inject = ['$state', '$stateParams', 'dataFactoryRepo'];
function DeleteControllerRepo ($state, $stateParams, dataFactoryRepo) {
    dataFactoryRepo.delete({id: $stateParams.id}).$promise.then(function() {
        $state.go('repoueber');
    });
}

