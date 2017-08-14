
var repos = require('../model/mod_repos');
var pw = require('../model/mod_passwort');


function ausgabeAlle(req, res) { //Ausgabe aller Repositories
    pw.adminCheck(req.headers).then(function success(){

        repos.ausgabeAlle_m(req.params.id).then(function success(row) {
            res.send(row);
            //console.log('fetch alle Repos ',row);
        }, function failure(err) {
            res.send(err);
        })
    },   
    function failure() { console.log('keine Berechtigung');
    res.send('keine Berechtigung')
})
}

//Alle Repos eines Benutzers ausgeben
function ausgabePersoenlich(req, res) {     //Ausgabe aller Repositories eines Nutzers  
    repos.ausgabePersoenlich_m(pw.getTokenID(req.headers)).then(function success(row) {
        res.send(row);
      //  console.log('fetch von Repos ',row);
    }, function failure(err) {
        res.send(err);
    })
}

function hinzufügenMitglied(req, res) { //Weiteren Zugriffberechtigen zu REpository hinzufügen
    pw.adminCheck(req.headers).then(function success(){
       // console.log('cont_repos.anlegen '+ req.body.EMAILKENNUNG + ' ' + req.body.REPOSITORY_ID /*+ req.body.NACHNAME + ' '+ req.body.VORNAME +' '+ req.body.EMAILKENNUNG +' '+ req.body.RECHTE_ID*/);
        var reposData = {
            EMAILKENNUNG: req.body.EMAILKENNUNG,
            REPOSITORY_ID: req.body.REPOSITORY_ID
        };
        console.log(reposData);

        repos.hinzufügenMitglied_m(reposData).then(function(id) {
            res.send(JSON.stringify({id: id}));
        });
    },   
    function failure() { console.log('keine Berechtigung');
    res.send('keine Berechtigung')
})
}


function benutzerentfernen(req, res) { //Einen Zugriffberechtigen von Repository entfernen
    pw.adminCheck(req.headers).then(function success(){

       // console.log('datenbody ', req.params.ID_REPO);
        repos.benutzerentfernen_m(req.params.id,req.params.ID_REPO).then(function() {       
            res.send(JSON.stringify(true));
        //    console.log('Einen Benutzer entfernen');
        });
    },   
    function failure() { console.log('keine Berechtigung');
    res.send('keine Berechtigung')
})
}

module.exports = {
    ausgabeAlle: ausgabeAlle,
    ausgabePersoenlich: ausgabePersoenlich,
    hinzufügenMitglied: hinzufügenMitglied,
    benutzerentfernen: benutzerentfernen

};