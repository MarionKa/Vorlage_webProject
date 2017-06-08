angular.module('webTestDB')
    .controller('ListControllerRepo', ListControllerRepo)
    .controller('ListControllerRepoBenutzer', ListControllerRepoBenutzer)
    .controller('FormControllerRepobeantragen', FormControllerRepobeantragen)
    .controller('FormControllerRepo', FormControllerRepo)
    .controller('DeleteControllerRepo', DeleteControllerRepo)
    .controller('DeleteControllerRepoBenutzer', DeleteControllerRepoBenutzer)

ListControllerRepo.$inject = ['dataFactoryRepo'];
function ListControllerRepo (dataFactoryRepo) {
    this.daten = dataFactoryRepo.getAll();       //getAll() in model.js (client) festgelegt
}

ListControllerRepoBenutzer.$inject = ['$state', '$stateParams','dataFactoryRepoBenutzer'];
function ListControllerRepoBenutzer ($state, $stateParams,dataFactoryRepoBenutzer) {
    this.daten = dataFactoryRepoBenutzer.getAll({id: $stateParams.id});       //getAll() in model.js (client) festgelegt
}


FormControllerRepobeantragen.$inject = ['$state', '$stateParams', 'dataFactoryArtAktiv'];
function FormControllerRepobeantragen ($state, $stateParams, dataFactoryArtAktiv) {
    console.log('in FormControllerRepobeantragen')
    this.aktivearten = dataFactoryArtAktiv.getAll(); //Daten für Repostatus Combobox
    console.log(this.aktivearten)
    this.ART_ID = '';

    this.save = function () {
        console.log('save repo: '+ this.AUTHNAME +' '+ this.REPONAME );

        var data = {
            ART_ID: this.ART_ID

        };
        if ($stateParams.id) {
            console.log('save update');
            data.id = $stateParams.id;
            FormControllerRepobeantragen.update(data).$promise.then($state.go.bind($state, 'ueberpers'));
            //'benutzerueber' mit 'list' austauschen, damit list.html wieder funktioniert
        } else {
            console.log('save create');
            FormControllerRepobeantragen.create(data).$promise.then($state.go.bind($state, 'ueberpers'));
            //'benutzerueber' mit 'list' austauschen, damit list.html wieder funktioniert
        }
    }.bind(this);
}

FormControllerRepo.$inject = ['$state', '$stateParams', 'dataFactoryRepo','dataFactoryRepostatus'];
function FormControllerRepo ($state, $stateParams, dataFactoryRepo,dataFactoryRepostatus) {
        this.repostatus = dataFactoryRepostatus.getAll(); //Daten für Repostatus Combobox
    this.ART = '';
    this.AUTHNAME = '';
    this.REPONAME = '';
    this.ALLE_BENUTZER = '';
    this.GUELTIG_BIS = '';
    this.REPO_STATUS_ID = '1';
    this.ID = '';
console.log('einstieg: ' + this.AUTHNAME)

    if($stateParams.id) {
        // console.log('SHOW stateParams.id: ' + $stateParams.id);

        dataFactoryRepo.read({id: $stateParams.id}).$promise.then(function(daten) {
            console.log('stateParams IN FKT '+ daten[0].ID);
            console.log('Format', typeof daten[0].REPO_STATUS_ID)
            this.ART = daten[0].ART;
            this.ART_ID = daten[0].ART_ID;
            this.AUTHNAME = daten[0].AUTHNAME;
            this.REPONAME = daten[0].REPONAME;
            this.ALLE_BENUTZER = daten[0].ALLE_BENUTZER;
            this.GUELTIG_BIS = daten[0].GUELTIG_BIS;
            this.REPO_STATUS_ID = daten[0].REPO_STATUS_ID.toString();  //toString() is nötig für ng-reapeat und die Combobox / Dropdown

            this.ID = daten[0].ID;

        }.bind(this));
        // console.log('AUSGABE IN FKT: ', this.ART_ID);
    }
         // console.log('AUSGABE NACH FKT: ', this.ART_ID);

    this.save = function () {
        console.log('save repo: '+ this.AUTHNAME +' '+ this.REPONAME );

        var data = {
            ART_ID: this.ART_ID,
            AUTHNAME: this.AUTHNAME,
            REPONAME: this.REPONAME,
            GUELTIG_BIS: this.GUELTIG_BIS,
            REPO_STATUS_ID: this.REPO_STATUS_ID,
            ID: this.ID


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

DeleteControllerRepoBenutzer.$inject = ['$state', '$stateParams', 'dataFactoryRepoBenutzer'];
function DeleteControllerRepoBenutzer ($state, $stateParams, dataFactoryRepoBenutzer) {
    console.log('c_cont_repo loeschen vor data: ' + $stateParams.REPOSITORY_ID + ' ' + $stateParams.id);
        var data = {
            ID_REPO: $stateParams.REPOSITORY_ID
        };
    console.log('c_cont_repo loeschen: ' + data.ID_REPO);
    dataFactoryRepoBenutzer.delete({ID_REPO: $stateParams.REPOSITORY_ID, id: $stateParams.id}).$promise.then(function() {
        
        $state.go('repoueber');//benutzerentf({id: this.ID})
    });
}
