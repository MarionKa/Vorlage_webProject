angular.module('webTestDB')
    .controller('ListControllerBenutzer', ListControllerBenutzer)
    .controller('FormControllerBenutzer', FormControllerBenutzer)
    .controller('DeleteControllerBenutzer', DeleteControllerBenutzer);

ListControllerBenutzer.$inject = ['dataFactoryBenutzer'];
function ListControllerBenutzer (dataFactoryBenutzer) {
    this.test = dataFactoryBenutzer.getAll();       //getAll() in model.js (client) festgelegt
}

FormControllerBenutzer.$inject = ['$state', '$stateParams', 'dataFactoryBenutzer'];
function FormControllerBenutzer ($state, $stateParams, dataFactoryBenutzer) {
    this.NACHNAME =  '';
    this.VORNAME = '';
    this.EMAILKENNUNG = '';
    this.RECHTE_ID = '';

    // this.REPONAME = '';
    // this.AUTHNAME = '';
    // this.ART_ID = '';
    // this.REPO_STATUS_ID = '';

        console.log('state FormControllerBenutzer');

    if($stateParams.id) {
        console.log('state2 ' + $stateParams.id);
        dataFactoryBenutzer.read({id: $stateParams.id}).$promise.then(function(test) {
            console.log('test im read ', test[0].RECHTE_ID );
            this.NACHNAME = test[0].NACHNAME;
            this.VORNAME = test[0].VORNAME;
            this.EMAILKENNUNG = test[0].EMAILKENNUNG;
            this.RECHTE_ID = test[0].RECHTE_ID;
            
            // console.log('test im read ', test[0].REPONAME);
            // this.REPONAME = test[0].REPONAME;
            // this.AUTHNAME = test[0].AUTHNAME;
            // this.ART_ID = test[0].ART_ID;
            // this.REPO_STATUS_ID = '1';
        }.bind(this));
    }

    this.save = function () {
        console.log('test1 '+ this.NACHNAME +' '+ this.VORNAME +' ' + this.EMAILKENNUNG);

        var data = {
            NACHNAME: this.NACHNAME,
            VORNAME: this.VORNAME,
            EMAILKENNUNG: this.EMAILKENNUNG,
            RECHTE_ID: this.RECHTE_ID,
            PASSWORT: 'test'

            // REPONAME: maka,
            // AUTHNAME: kaiserma,
            // ART_ID: 1,
            // REPO_STATUS_ID: '1'

        };
        if ($stateParams.id) {
            console.log('save update');
            data.id = $stateParams.id;
            dataFactoryBenutzer.update(data).$promise.then($state.go.bind($state, 'benutzerueber'));
        } else {
            console.log('save create');
            dataFactoryBenutzer.create(data).$promise.then($state.go.bind($state, 'benutzerueber'));
        }
    }.bind(this);
}

DeleteControllerBenutzer.$inject = ['$state', '$stateParams', 'dataFactoryBenutzer'];
function DeleteControllerBenutzer ($state, $stateParams, dataFactoryBenutzer) {
    dataFactoryBenutzer.delete({id: $stateParams.id}).$promise.then(function() {
        $state.go('benutzerueber');
    });
}

