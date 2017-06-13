angular.module('webTestDB')
    .controller('ListControllerArt', ListControllerArt)
    .controller('FormControllerArt', FormControllerArt)
    .controller('DeleteControllerArt', DeleteControllerArt);

ListControllerArt.$inject = ['dataFactoryArt'];
function ListControllerArt (dataFactoryArt) {
    this.daten = dataFactoryArt.getAll();       //getAll() in model.js (client) festgelegt
}

FormControllerArt.$inject = ['$state', '$stateParams', 'dataFactoryArt'];
function FormControllerArt ($state, $stateParams, dataFactoryArt) {
    this.BEZEICHNUNG =  '';
    this.ORDNERNAME = '';
    this.EINTRAGEN_MGL = '';
    this.ID = '';


        console.log('state FormControllerArt');

    if($stateParams.id) {
        console.log('state2 ' + $stateParams.id);
        dataFactoryArt.read({id: $stateParams.id}).$promise.then(function(daten) {
            console.log('daten im read ', daten[0].EINTRAGEN_MGL );
            
            this.BEZEICHNUNG = daten[0].BEZEICHNUNG;
            this.ORDNERNAME = daten[0].ORDNERNAME;
            this.EINTRAGEN_MGL = daten[0].EINTRAGEN_MGL.toString();
            this.ID = daten[0].ID;

        }.bind(this));
    }

    this.save = function () {
        console.log('daten1 '+ this.BEZEICHNUNG +' '+ this.ORDNERNAME +' ' + this.EINTRAGEN_MGL);

        var data = {
            BEZEICHNUNG: this.BEZEICHNUNG,
            ORDNERNAME: this.ORDNERNAME,
            EINTRAGEN_MGL: this.EINTRAGEN_MGL
            // ID: this.ID,
            // PASSWORT: 'daten'

        };
        if ($stateParams.id) {
            console.log('save update');
            data.id = $stateParams.id;
            dataFactoryArt.update(data).$promise.then($state.go.bind($state, 'artueber'));
        } else {
            console.log('save create');
            dataFactoryArt.create(data).$promise.then($state.go.bind($state, 'artueber'));
        }
    }.bind(this);
}

DeleteControllerArt.$inject = ['$state', '$stateParams', 'dataFactoryArt'];
function DeleteControllerArt ($state, $stateParams, dataFactoryArt) {
    dataFactoryArt.delete({id: $stateParams.id}).$promise.then(function(nachricht) {
        console.log(nachricht.meldung);
        $state.go('artueber');
    });
}

