angular.module('webTestDB')
    .controller('ListControllerArt', ListControllerArt)
    .controller('FormControllerArt', FormControllerArt)
    .controller('DeleteControllerArt', DeleteControllerArt);

ListControllerArt.$inject = ['dataFactoryArt'];
function ListControllerArt (dataFactoryArt) {
    this.test = dataFactoryArt.getAll();       //getAll() in model.js (client) festgelegt
}

FormControllerArt.$inject = ['$state', '$stateParams', 'dataFactoryArt'];
function FormControllerArt ($state, $stateParams, dataFactoryArt) {
    this.BEZEICHNUNG =  '';
    this.ORDNERNAME = '';
    this.EINTRAGEN_MGL = '';


        console.log('state FormControllerArt');

    if($stateParams.id) {
        console.log('state2 ' + $stateParams.id);
        dataFactoryArt.read({id: $stateParams.id}).$promise.then(function(test) {
            console.log('test im read ', test[0].EINTRAGEN_MGL );
            this.BEZEICHNUNG = test[0].BEZEICHNUNG;
            this.ORDNERNAME = test[0].ORDNERNAME;
            this.EINTRAGEN_MGL = test[0].EINTRAGEN_MGL;

        }.bind(this));
    }

    this.save = function () {
        console.log('test1 '+ this.BEZEICHNUNG +' '+ this.ORDNERNAME +' ' + this.EINTRAGEN_MGL);

        var data = {
            BEZEICHNUNG: this.BEZEICHNUNG,
            ORDNERNAME: this.ORDNERNAME,
            EINTRAGEN_MGL: this.EINTRAGEN_MGL_NEU,
            PASSWORT: 'test'

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
    dataFactoryArt.delete({id: $stateParams.id}).$promise.then(function() {
        $state.go('artueber');
    });
}

