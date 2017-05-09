angular.module('webTestDB')
    .controller('ListControllerRepos', ListControllerRepos)
    .controller('FormControllerRepos', FormControllerRepos)
    .controller('DeleteController', DeleteController);

ListControllerRepos.$inject = ['dataFactoryRepos'];
function ListControllerRepos (dataFactoryRepos) {
    this.test = dataFactoryRepos.getAll();       //getAll() in model.js (client) festgelegt
}

FormControllerRepos.$inject = ['$state', '$stateParams', 'dataFactoryRepos'];
function FormControllerRepos ($state, $stateParams, dataFactoryRepos) {
    this.ART =  '';
    this.AUTHNAME = '';
    this.REPONAME = '';
    this.ALLE_BENUTZER = '';
    this.GUELTIG_BIS = '';

    // this.REPONAME = '';
    // this.AUTHNAME = '';
    // this.ART_ID = '';
    // this.REPO_STATUS_ID = '';

        console.log('state FormControllerRepos');

    if($stateParams.id) {
        console.log('state2 ' + $stateParams.id);
        dataFactoryRepos.read({id: $stateParams.id}).$promise.then(function(test) {
            console.log('test im read ', test[0].RECHTE_ID );
            this.ART = test[0].ART;
            this.AUTHNAME = test[0].AUTHNAME;
            this.REPONAME = test[0].REPONAME;
            this.ALLE_BENUTZER = test[0].ALLE_BENUTZER;
            this.GUELTIG_BIS = test[0].GUELTIG_BIS;

            
            // console.log('test im read ', test[0].REPONAME);
            // this.REPONAME = test[0].REPONAME;
            // this.AUTHNAME = test[0].AUTHNAME;
            // this.ART_ID = test[0].ART_ID;
            // this.REPO_STATUS_ID = '1';
        }.bind(this));
    }

    this.save = function () {
        console.log('test1 '+ this.ART_ID +' '+ this.AUTHNAME +' ' + this.REPONAME);

        var data = {
            ART_ID: this.ART_ID,
            AUTHNAME: this.AUTHNAME,
            REPONAME: this.REPONAME,
            ALLE_BENUTZER: this.ALLE_BENUTZER,
            GUELTIG_BIS: this.GUELTIG_BIS

            // REPONAME: maka,
            // AUTHNAME: kaiserma,
            // ART_ID: 1,
            // REPO_STATUS_ID: '1'

        };
        if ($stateParams.id) {
            console.log('save update');
            data.id = $stateParams.id;
            dataFactoryRepos.update(data).$promise.then($state.go.bind($state, 'repoedit'));
            //'benutzerueber' mit 'list' austauschen, damit list.html wieder funktioniert
        } else {
            console.log('save create');
            dataFactoryRepos.create(data).$promise.then($state.go.bind($state, 'repoedit'));
            //'benutzerueber' mit 'list' austauschen, damit list.html wieder funktioniert
        }
    }.bind(this);
}

DeleteController.$inject = ['$state', '$stateParams', 'dataFactoryRepos'];
function DeleteController ($state, $stateParams, dataFactoryRepos) {
    dataFactoryRepos.delete({id: $stateParams.id}).$promise.then(function() {
        $state.go('repoedit');
    });
}

