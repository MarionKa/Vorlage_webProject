var art = require('../model/mod_art');

function ausgabeAlle(req, res) {      //SELECT mit GET-Methode
    art.ausgabeAlle_m(req.params.id).then(function success(row) {
        res.send(row);
        console.log('fetch alle art ',row);
    }, function failure(err) {
        res.send(err);
    })
}

function ausgabeEin(req, res) {      //SELECT mit GET-Methode
    art.ausgabeEin_m(req.params.id).then(function success(row) {
        res.send(row);
        console.log('fetch eine Art ',row);
    }, function failure(err) {
        res.send(err);
    })
}

//Alle aktiven Repo-Arten, d.h. REPO_STATUS_ID = 1, ausgeben
function ausgabeAktiv(req, res) {      //SELECT mit GET-Methode
    art.ausgabeAktiv_m(req.params.id).then(function success(row) {
        res.send(row);
        console.log('fetch von Art ',row);
    }, function failure(err) {
        res.send(err);
    })
}

function eingabe(req, res) {
    console.log('cont_art.eingabe '+ req.body.BEZEICHNUNG + ' '+ req.body.ORDNERNAME +' '+ req.body.EINTRAGEN_MGLS);
    var artData = {
        BEZEICHNUNG: req.body.BEZEICHNUNG,
        ORDNERNAME: req.body.ORDNERNAME,
        EINTRAGEN_MGL: req.body.EINTRAGEN_MGL
    };
    console.log(artData);

    art.eingabe_m(artData).then(function(id) {
        res.send(JSON.stringify({id: id}));
    });
}

function update(req, res) {
    console.log('update server'+ ' ' + req.body.BEZEICHNUNG + ' '+ req.body.ORDNERNAME +' '+ req.body.EINTRAGEN_MGL);
    var artData = {
        BEZEICHNUNG: req.body.BEZEICHNUNG,
        ORDNERNAME: req.body.ORDNERNAME,
        EINTRAGEN_MGL: req.body.EINTRAGEN_MGL
    };

    art.update_m(artData, req.params.id).then(function() {
        res.send(JSON.stringify(true));
    });
}

function loeschen(req, res) {
    art.loeschen_m(req.params.id).then(function() {
        res.send(JSON.stringify(true));
    });
}



module.exports = {
    ausgabeAlle: ausgabeAlle,
    ausgabeEin: ausgabeEin,
    ausgabeAktiv: ausgabeAktiv,
    eingabe: eingabe,
    update: update,
    loeschen: loeschen
};