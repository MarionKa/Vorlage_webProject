var repo = require('../model/mod_repo');

function ausgabeEin(req, res) {      //SELECT mit GET-Methode
    repo.ausgabeEin_m(req.params.id).then(function success(row) {
        res.send(row);
        console.log('fetch von Repo ',row);
    }, function failure(err) {
        res.send(err);
    })
}

// function ausgabeStatus(req, res) {
//     repo.ausgabeStatus_m(req.params.id).then(function success(row) {
//         console.log('fetch von repo status', row);
//     }, function failure(err) {
//         res.send(err);
//     })
// }

function eingabe(req, res) {        //Persönliches Repository hinzufügen
    console.log('cont_repo.eingabe '+ req.body.REPONAME + ' ' + req.body.AUTHNAME);
    var repoData = {
        REPONAME: req.body.REPONAME,
        AUTHNAME: req.body.AUTHNAME,
        GUELTIG_BIS: req.body.GUELTIG_BIS,
        ART_ID: req.body.ART_ID,
        REPO_STATUS_ID: req.body.REPO_STATUS_ID

    };
    console.log(repoData);

    repo.eingabe_m(repoData).then(function(id) {
        res.send(JSON.stringify({id: id}));
    });
}

function update(req, res) {         //Update mit PUT-Methode
    console.log('update server'+ ' ' + req.body.REPONAME + ' '+ req.body.AUTHNAME +' '+ req.body.GUELTIG_BIS);
    var repoData = { 
        REPONAME: req.body.REPONAME,
        AUTHNAME: req.body.AUTHNAME,
        GUELTIG_BIS: req.body.GUELTIG_BIS,
        ART_ID: req.body.ART_ID,
        REPO_STATUS_ID: req.body.REPO_STATUS_ID
    };

    repo.update_m(repoData, req.params.id).then(function() {
        res.send(JSON.stringify(true));
    });
}

//Ein Repo und dessen Einträge in der Verbinden-Tabelle löschen
function loeschen(req, res) {
    repo.loeschen_m(req.params.id).then(function() {
        res.send(JSON.stringify(true)); //Konvertiert eine js-Wert in einen json-String
        console.log('Wir wollen loeschen: repo');
    });
}

module.exports = {
    ausgabeEin: ausgabeEin,
    eingabe: eingabe,
    update: update,
    loeschen: loeschen

};