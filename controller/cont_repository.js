var repo = require('../model/mod_repository');
var pw = require('../model/mod_passwort');


function ausgabeEin(req, res) {      //SELECT mit GET-Methode
    pw.adminCheck(req.headers).then(function success(){
        repo.ausgabeEin_m(req.params.id).then(function success(row) {
            res.send(row);
            console.log('fetch von Repo ',row);
        }, function failure(err) {
            res.send(err);
        })
    },   
    function failure() { console.log('keine Berechtigung');
    res.send('keine Berechtigung')
})
}

function repostatus(req, res) {      
    pw.adminCheck(req.headers).then(function success(){
        repo.repostatus_m().then(function success(row) {
            res.send(row);
            console.log('alle RepoStatuse',row);
        }, function failure(err) {
            res.send(err);
        })
    },   
    function failure() { console.log('keine Berechtigung');
    res.send('keine Berechtigung')
})
}


function benutzerDesRepos(req, res) {      //SELECT mit GET-Methode
    pw.adminCheck(req.headers).then(function success(){
        repo.benutzerDesRepos_m(req.params.id).then(function success(row) {
            res.send(row);
            console.log('benutzerDesRepos ',row);
        }, function failure(err) {
            res.send(err);
        })
    },   
    function failure() { console.log('keine Berechtigung');
    res.send('keine Berechtigung')
})
}

function erstellenAlsUser(req, res) {        //Persönliches Repository hinzufügen
    var artId =req.body.ART_ID;
    var benutzerId =pw.getTokenID(req.headers);
    console.log('\n\n\n\n\n\n\n\n\n\n'+ artId +' benutzerId'+ benutzerId +'\n\n\n\n\n\n\n\n\n\n')
    repo.doppeltCheck(artId,benutzerId).then(function success(){
        console.log('cont_repo.erstellenUser '+ req.body.REPONAME + ' ' + req.body.AUTHNAME);
        var repoData = {
            ART_ID: artId,
            BENUTZER_ID: benutzerId,
            REPO_STATUS_ID: 1 // Für Beantragt

        };
        console.log(repoData);

        repo.erstellenAlsUser_m(repoData).then(function(id) {
            res.send(JSON.stringify({id: id}));
        }); 
    },   
    function failure() { console.log('gibts schon');
    res.send('gibts schon')
}) 
}

function erstellenAlsAdmin(req, res) {        //Persönliches Repository hinzufügen
    pw.adminCheck(req.headers).then(function success(){
        console.log('cont_repo.erstellenAdmin '+ req.body.REPONAME + ' ' + req.body.AUTHNAME);
        var repoData = {
            REPONAME: req.body.REPONAME,
            AUTHNAME: req.body.AUTHNAME,
            GUELTIG_BIS: req.body.GUELTIG_BIS,
            ART_ID: req.body.ART_ID,
            BENUTZER_ID: pw.getTokenID(req.headers),
            REPO_STATUS_ID: req.body.REPO_STATUS_ID

        };
        console.log(repoData);

        repo.erstellenAlsAdmin_m(repoData).then(function(id) {
            res.send(JSON.stringify({id: id}));
        });
    },   
    function failure() { console.log('keine Berechtigung');
    res.send('keine Berechtigung')
})
}

function update(req, res) {         //Update mit PUT-Methode
    pw.adminCheck(req.headers).then(function success(){
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
    },   
    function failure() { console.log('keine Berechtigung');
    res.send('keine Berechtigung')
})
}

//Ein Repo und dessen Einträge in der Verbinden-Tabelle löschen
function loeschen(req, res) {
    pw.adminCheck(req.headers).then(function success(){
        repo.loeschen_m().then(function() {
        res.send(JSON.stringify(true)); //Konvertiert eine js-Wert in einen json-String
        console.log('Wir wollen loeschen: repo');
    });
    },   
    function failure() { console.log('keine Berechtigung');
    res.send('keine Berechtigung')
})
}

module.exports = {
    ausgabeEin: ausgabeEin,
    erstellenAlsUser: erstellenAlsUser,
    erstellenAlsAdmin: erstellenAlsAdmin,
    update: update,
    loeschen: loeschen,
    benutzerDesRepos: benutzerDesRepos,
    repostatus: repostatus

};