var repos = require('../model/mod_repos');
var pw = require('../model/mod_passwort');


function ausgabeAlle(req, res) {
    pw.adminCheck(req.headers).then(function success(){

        repos.ausgabeAlle_m(req.params.id).then(function success(row) {
            res.send(row);
            console.log('fetch alle Repos ',row);
        }, function failure(err) {
            res.send(err);
        })
    },   
    function failure() { console.log('keine Berechtigung');
    res.send('keine Berechtigung')
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
    pw.adminCheck(req.headers).then(function success(){

        console.log('cont_repos.anlegen '+ req.body.EMAILKENNUNG + ' ' + req.body.REPOSITORY_ID /*+ req.body.NACHNAME + ' '+ req.body.VORNAME +' '+ req.body.EMAILKENNUNG +' '+ req.body.RECHTE_ID*/);
        var reposData = {
            EMAILKENNUNG: req.body.EMAILKENNUNG,
            REPOSITORY_ID: req.body.REPOSITORY_ID
        };
        console.log(reposData);

        repos.eingabe_m(reposData).then(function(id) {
            res.send(JSON.stringify({Nachricht: id}));
        });
    },   
    function failure() { console.log('keine Berechtigung');
    res.send('keine Berechtigung')
})
}

//Einen Benutzer aus Repo entfernen
function loeschen(req, res) {
    pw.adminCheck(req.headers).then(function success(){

        console.log('datenbody ', req.params.ID_REPO);
        repos.loeschen_m(req.params.id,req.params.ID_REPO).then(function() {       
            res.send(JSON.stringify(true));
            console.log('Einen Benutzer entfernen');
        });
    },   
    function failure() { console.log('keine Berechtigung');
    res.send('keine Berechtigung')
})
}

module.exports = {
    ausgabeAlle: ausgabeAlle,
    ausgabeEin: ausgabeEin,
    eingabe: eingabe,
    loeschen: loeschen

};