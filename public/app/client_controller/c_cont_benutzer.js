angular.module('webTestDB')
    .controller('ListControllerBenutzer', ListControllerBenutzer)
    .controller('FormControllerBenutzer', FormControllerBenutzer)
    .controller('DeleteControllerBenutzer', DeleteControllerBenutzer);

ListControllerBenutzer.$inject = ['dataFactoryBenutzer'];
function ListControllerBenutzer (dataFactoryBenutzer) {
    this.daten = dataFactoryBenutzer.getAll();       //getAll() in model.js (client) festgelegt
}

FormControllerBenutzer.$inject = ['$state', '$stateParams', 'dataFactoryBenutzer'];
function FormControllerBenutzer ($state, $stateParams, dataFactoryBenutzer) {
    this.NACHNAME =  '';
    this.VORNAME = '';
    this.EMAILKENNUNG = '';
    this.RECHTE = '';
    this.ID ='';

    console.log('state FormControllerBenutzer');

    if($stateParams.id) {
        console.log('state2 ' + $stateParams.id);
        dataFactoryBenutzer.read({id: $stateParams.id}).$promise.then(function(daten) {
            console.log('daten im read ', daten[0].RECHTE_ID );
            this.NACHNAME = daten[0].NACHNAME;
            this.VORNAME = daten[0].VORNAME;
            this.EMAILKENNUNG = daten[0].EMAILKENNUNG;
            this.RECHTE_ID = daten[0].RECHTE_ID.toString();
            this.ID = daten[0].ID;
            
            // console.log('daten im read ', daten[0].REPONAME);
            // this.REPONAME = daten[0].REPONAME;
            // this.AUTHNAME = daten[0].AUTHNAME;
            // this.ART_ID = daten[0].ART_ID;
            // this.REPO_STATUS_ID = '1';
        }.bind(this));
    }

    this.save = function () {
        console.log('daten1 '+ this.NACHNAME +' '+ this.VORNAME +' ' + this.EMAILKENNUNG);

        var data = {
            NACHNAME: this.NACHNAME,
            VORNAME: this.VORNAME,
            EMAILKENNUNG: this.EMAILKENNUNG,
            RECHTE_ID: this.RECHTE_ID,
            ID: this.ID,
            PASSWORT: this.PASSWORT

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

