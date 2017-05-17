angular.module('webTestDB')
    .controller('ListControllerRepo', ListControllerRepo)
    .controller('FormControllerRepo', FormControllerRepo)
    .controller('DeleteController', DeleteController);

ListControllerRepo.$inject = ['dataFactoryRepo'];
function ListControllerRepo (dataFactoryRepo) {
    this.test = dataFactoryRepo.getAll();       //getAll() in model.js (client) festgelegt
}

FormControllerRepo.$inject = ['$state', '$stateParams', 'dataFactoryRepo'];
function FormControllerRepo ($state, $stateParams, dataFactoryRepo) {
    this.ART_ID =  '';
    this.AUTHNAME = '';
    this.REPONAME = '';
    this.ALLE_BENUTZER = '';
    this.GUELTIG_BIS = '';
    this.REPO_STATUS_ID = '';


    // this.REPONAME = '';
    // this.AUTHNAME = '';
    // this.ART_ID = '';
    // this.REPO_STATUS_ID = '';

        console.log('state FormControllerRepo');

    if($stateParams.id) {
        console.log('state2 ' + $stateParams.id);
        dataFactoryRepo.read({id: $stateParams.id}).$promise.then(function(test) {
            console.log('test im read ', test[0].ART_ID);
            this.ART_ID = test[0].ART_ID;
            this.AUTHNAME = test[0].AUTHNAME;
            this.REPONAME = test[0].REPONAME;
            this.ALLE_BENUTZER = test[0].ALLE_BENUTZER;
            this.GUELTIG_BIS = test[0].GUELTIG_BIS;
            this.REPO_STATUS_ID = test[0].REPO_STATUS_ID;
            
            // console.log('test im read ', test[0].REPONAME);
            // this.REPONAME = test[0].REPONAME;
            // this.AUTHNAME = test[0].AUTHNAME;
            // this.ART_ID = test[0].ART_ID;
            // this.REPO_STATUS_ID = '1';
        }.bind(this));
    }

    this.save = function () {
        console.log('save repo: '+ this.AUTHNAME +' '+ this.REPONAME +' ' + this.BENUTZERNAMEN);

        var data = {
            ART_ID: this.ART_ID,
            AUTHNAME: this.AUTHNAME,
            REPONAME: this.REPONAME,
            GUELTIG_BIS: this.GUELTIG_BIS,
            REPO_STATUS_ID: this.REPO_STATUS_ID_NEU

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

DeleteController.$inject = ['$state', '$stateParams', 'dataFactoryRepo'];
function DeleteController ($state, $stateParams, dataFactoryRepo) {
    dataFactoryRepo.delete({id: $stateParams.id}).$promise.then(function() {
        $state.go('repoueber');
    });
}

