var art = require('../model/mod_art');
var pw = require('../model/mod_passwort');


function ausgabeAlle(req, res) {     // Ausgabe aller eingetragenen Arten
    pw.adminCheck(req.headers).then(function success(){
        art.ausgabeAlle_m(req.params.id).then(function success(row) {
            res.send(row);
            console.log('fetch alle art ',row);
        }, function failure(err) {
            res.send(err);
        })
    },   
    function failure() { console.log('keine Berechtigung');
    res.send('keine Berechtigung')
})
}

function ausgabeEin(req, res) {   //Ausgabe einer Art auf Basis der ID
    pw.adminCheck(req.headers).then(function success(){
        art.ausgabeEin_m(req.params.id).then(function success(row) {
            res.send(row);
            console.log('fetch eine Art ',row);
        }, function failure(err) {
            res.send(err);
        })
    },   
    function failure() { console.log('keine Berechtigung');
    res.send('keine Berechtigung')
})
}

//Alle aktiven Repo-Arten, d.h. REPO_STATUS_ID = 1, ausgeben
function ausgabeAktiv(req, res) { 
    art.ausgabeAktiv_m(req.params.id).then(function success(row) {
        res.send(row);
       // console.log('fetch von Art ',row);
    }, function failure(err) {
        res.send(err);
    })
}

function eingabe(req, res) { //Hinzufügen einer neuen Art
    pw.adminCheck(req.headers).then(function success(){   
        //console.log('cont_art.eingabe '+ req.body.BEZEICHNUNG + ' '+ req.body.ORDNERNAME +' '+ req.body.EINTRAGEN_MGLS);
        var artData = {
            BEZEICHNUNG: req.body.BEZEICHNUNG,
            ORDNERNAME: req.body.ORDNERNAME,
            EINTRAGEN_MGL: req.body.EINTRAGEN_MGL
        };
        console.log(artData);

        art.eingabe_m(artData).then(function(id) {
            res.send(JSON.stringify({id: id}));
        });
    },   
    function failure() { console.log('keine Berechtigung');
    res.send('keine Berechtigung')
})        
}

function update(req, res) { //Ändern einer Art. Ändern des Ordnernamens nicht Möglich, da bereits Repositories auf dem Server sein können.
    pw.adminCheck(req.headers).then(function success(){

       // console.log('update server'+ ' ' + req.body.BEZEICHNUNG + ' '+ req.body.ORDNERNAME +' '+ req.body.EINTRAGEN_MGL);
        var artData = {
            BEZEICHNUNG: req.body.BEZEICHNUNG,
            ORDNERNAME: req.body.ORDNERNAME,
            EINTRAGEN_MGL: req.body.EINTRAGEN_MGL
        };

        art.update_m(artData, req.params.id).then(function() {
            res.send(JSON.stringify(true));
        });
    },   
    function failure() { console.log('keine Berechtigung');
    res.send('keine Berechtigung')
})
}

function loeschen(req, res) {//Löschen einer Art
    pw.adminCheck(req.headers).then(function success(){

        art.loeschen_m(req.params.id).then(function success(row) {
            res.send(row);
        //    console.log('loeschen: ',row.meldung);
        }, function failure(err) {
            res.send(err);
        });
    },   
    function failure() { console.log('keine Berechtigung');
    res.send('keine Berechtigung')
})

}



module.exports = {
    ausgabeAlle: ausgabeAlle,
    ausgabeEin: ausgabeEin,
    ausgabeAktiv: ausgabeAktiv,
    eingabe: eingabe,
    update: update,
    loeschen: loeschen
};