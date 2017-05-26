var benutzer = require('../model/mod_benutzer');
var pw = require('../model/mod_passwort');
var passport    = require('passport');
var jwt         = require('jwt-simple');
var bodyParser  = require('body-parser');

function ausgabeAlle(req, res) {      //SELECT mit GET-Methode
    benutzer.ausgabeAlle_m(req.params.id).then(function success(row) {
        res.send(row);
        console.log('fetch alle benutzer ',row);
    }, function failure(err) {
        res.send(err);
    })
}



function ausgabeAllePP(req, res) {      //SELECT mit GET-Methode
    console.log('im cont_benutzer'); 
    pw.adminCheck(req.headers).then(function success(){

            benutzer.ausgabeAlle_m(req.params.id).then(function success(row) {
                res.send(row);
                console.log('ausgabeAllePP ',row);
            }, function failure(err) {
                res.send(err);
            })
        },   
        function failure() { console.log('keine Berechtigung');
         res.send('keine Berechtigung')
        })
}




function ausgabeEin(req, res) {      //SELECT mit GET-Methode
    benutzer.ausgabeEin_m(req.params.id).then(function success(row) {   //req-Objekt stellt params-Objekt zur verfügung, das Variablen enthält
        res.send(row);
        console.log('fetch einen Benutzer ',row);
    }, function failure(err) {
        res.send(err);
    })
}

function eingabe(req, res) {        //Insert mit POST-Methode
    console.log('cont_benutzer.anlegen '+ req.body.NACHNAME + ' '+ req.body.VORNAME +' '+ req.body.EMAILKENNUNG +' '+ req.body.RECHTE_ID);
    var benutzerData = {
        NACHNAME: req.body.NACHNAME,
        VORNAME: req.body.VORNAME,
        EMAILKENNUNG: req.body.EMAILKENNUNG,
        PASSWORT: req.body.PASSWORT,
        RECHTE_ID: req.body.RECHTE_ID
    };
    console.log(benutzerData);

    benutzer.eingabe_m(benutzerData).then(function(id) {
        res.send(JSON.stringify({id: id}));
    });
}

function update(req, res) {         //Update mit PUT-Methode
    console.log('update server'+ ' ' + req.body.NACHNAME + ' '+ req.body.VORNAME +' '+ req.body.EMAILKENNUNG +' '+ req.body.RECHTE_ID);
    var benutzerData = {
        NACHNAME: req.body.NACHNAME,
        VORNAME: req.body.VORNAME,
        EMAILKENNUNG: req.body.EMAILKENNUNG,
        RECHTE_ID: req.body.RECHTE_ID,
        PASSWORT: req.body.PASSWORT
    };

    benutzer.update_m(benutzerData, req.params.id).then(function() {
        res.send(JSON.stringify(true));
    });
}

function loeschen(req, res) {           //DELETE mit DELETE-Methode
    benutzer.loeschen_m(req.params.id).then(function() {
        res.send(JSON.stringify(true));
        console.log('Wir wollen loeschen: benutzer');
    });
}

module.exports = {
    ausgabeAlle: ausgabeAlle,
    ausgabeAllePP: ausgabeAllePP,
    ausgabeEin: ausgabeEin,
    eingabe: eingabe,
    update: update,
    loeschen: loeschen
};