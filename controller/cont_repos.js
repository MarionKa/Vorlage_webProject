var repos = require('../model/mod_repos');

function ausgabeAlle(req, res) {      
    repos.ausgabeAlle_m(req.params.id).then(function success(row) {
        res.send(row);
        console.log('fetch alle Repos ',row);
    }, function failure(err) {
        res.send(err);
    })
}

//Alle Repos eines Benutzers ausgeben
function ausgabeEin(req, res) {      
    repos.ausgabeEin_m(req.params.id).then(function success(row) {
        res.send(row);
        console.log('fetch von Repos ',row);
    }, function failure(err) {
        res.send(err);
    })
}

function eingabe(req, res) {        //Mitglied zu Repository hinzufügen
    console.log('cont_repos.anlegen '+ req.body.BENUTZER_ID + ' ' + req.body.REPOSITORY_ID /*+ req.body.NACHNAME + ' '+ req.body.VORNAME +' '+ req.body.EMAILKENNUNG +' '+ req.body.RECHTE_ID*/);
    var reposData = {
        BENUTZER_ID: req.body.BENUTZER_ID,
        REPOSITORY_ID: req.body.REPOSITORY_ID
    };
    console.log(reposData);

    repos.eingabe_m(reposData).then(function(id) {
        res.send(JSON.stringify({id: id}));
    });
}

//Ein Repository löschen
function loeschen(req, res) {
    repos.loeschen_m(req.params.id).then(function() {
        res.send(JSON.stringify(true));
        console.log('Wir wollen loeschen: repos');
    });
}

module.exports = {
    ausgabeAlle: ausgabeAlle,
    ausgabeEin: ausgabeEin,
    eingabe: eingabe,
    loeschen: loeschen

};