var benutzer = require('../model/mod_benutzer');
var pw = require('../model/mod_passwort');
var passport    = require('passport');
var jwt         = require('jwt-simple');
var bodyParser  = require('body-parser');


function ausgabeAlle(req, res) {     //Ausgabe aller in der Tabelle vorhandenen Benutzer  
    pw.adminCheck(req.headers).then(function success(){

        benutzer.ausgabeAlle_m(req.params.id).then(function success(row) {
            res.send(row);
            //console.log('ausgabeAlle ',row);
        }, function failure(err) {
            res.send(err);
        })
    },   
    function failure() { console.log('keine Berechtigung');
    res.send('keine Berechtigung')
})
}




function ausgabeEin(req, res) {     //Ausgabe eines einzigen Benutzers auf Basis seiner ID
    pw.adminCheck(req.headers).then(function success(){

    benutzer.ausgabeEin_m(req.params.id).then(function success(row) { 
        res.send(row);
    //    console.log('fetch einen Benutzer ',row);
    }, function failure(err) {
        res.send(err);
    })
},   
function failure() { console.log('keine Berechtigung');
res.send('keine Berechtigung')
})
}

function anlegen(req, res) {   // Fügt einen Benutzer hinzu  //wenn er nocht nicht Vorhanden ist
    benutzer.doppeltCheck(req.body.EMAILKENNUNG).then(function success(){
    //console.log('cont_benutzer.anlegen '+ req.body.NACHNAME + ' '+ req.body.VORNAME +' '+ req.body.EMAILKENNUNG +' RECHTE_ID is immer 2 und nicht '+ req.body.RECHTE_ID);
    var benutzerData = {
        NACHNAME: req.body.NACHNAME,
        VORNAME: req.body.VORNAME,
        EMAILKENNUNG: req.body.EMAILKENNUNG,
        PASSWORT: req.body.PASSWORT,
        RECHTE_ID: 2 //USER
    };
    console.log(benutzerData);

    benutzer.anlegen_m(benutzerData).then(function(id) {
        res.send(JSON.stringify({id: id}));
    });
},   
    function failure() { console.log('doppelt');
    res.send('doppelt')
})
}

function update(req, res) {    //Aktualisierung eines Benutzers     
    pw.adminCheck(req.headers).then(function success(){

        //console.log('update '+ ' ' + req.body.NACHNAME + ' '+ req.body.VORNAME +' '+ req.body.EMAILKENNUNG +' '+ req.body.RECHTE_ID);
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
    },   
    function failure() { console.log('keine Berechtigung');
    res.send('keine Berechtigung')
})
}

function loeschen(req, res) {
    pw.adminCheck(req.headers).then(function success(){

        benutzer.loeschen_m(req.params.id).then(function() {
            res.send(JSON.stringify(true));
         //   console.log('Benutzer löschen');
        });
    },   
    function failure() { console.log('keine Berechtigung');
    res.send('keine Berechtigung')
})    
}

module.exports = {
    ausgabeAlle: ausgabeAlle,
    ausgabeEin: ausgabeEin,
    anlegen: anlegen,
    update: update,
    loeschen: loeschen
};