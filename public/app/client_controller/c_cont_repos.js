angular.module('webTestDB')
    .controller('ListController', ListController)
    .controller('FormController', FormController)
    .controller('DeleteController', DeleteController);

ListController.$inject = ['dataFactory'];
function ListController (dataFactory) {
    this.test = dataFactory.getAll();       //getAll() in model.js (client) festgelegt
}

FormController.$inject = ['$state', '$stateParams', 'dataFactory'];
function FormController ($state, $stateParams, dataFactory) {
    this.NACHNAME =  '';
    this.VORNAME = '';
    this.EMAILKENNUNG = '';
    this.RECHTE_ID = '';

    // this.REPONAME = '';
    // this.AUTHNAME = '';
    // this.ART_ID = '';
    // this.REPO_STATUS_ID = '';

        console.log('state FormController');

    if($stateParams.id) {
        console.log('state2 ' + $stateParams.id);
        dataFactory.read({id: $stateParams.id}).$promise.then(function(test) {
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
            RECHTE_ID: 1,
            PASSWORT: 'test'

            // REPONAME: maka,
            // AUTHNAME: kaiserma,
            // ART_ID: 1,
            // REPO_STATUS_ID: '1'

        };
        if ($stateParams.id) {
            console.log('save update');
            data.id = $stateParams.id;
            dataFactory.update(data).$promise.then($state.go.bind($state, 'benutzerueber'));
            //'benutzerueber' mit 'list' austauschen, damit list.html wieder funktioniert
        } else {
            console.log('save create');
            dataFactory.create(data).$promise.then($state.go.bind($state, 'benutzerueber'));
            //'benutzerueber' mit 'list' austauschen, damit list.html wieder funktioniert
        }
    }.bind(this);
}

DeleteController.$inject = ['$state', '$stateParams', 'dataFactory'];
function DeleteController ($state, $stateParams, dataFactory) {
    dataFactory.delete({id: $stateParams.id}).$promise.then(function() {
        $state.go('benutzerueber');
    });
}

