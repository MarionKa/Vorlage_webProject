var benutzer = require('../model/mod_art');

function ausgeben(req, res) {      //ausgeben
    benutzer.ausgeben(req.params.id).then(function success(row) {
        res.send(row);
        console.log('fetch cont_art ',row);
    }, function failure(err) {
        res.send(err);
    })
}

function anlegen(req, res) {
    console.log('cont_benutzer.anlegen '+ req.body.NACHNAME + ' '+ req.body.VORNAME +' '+ req.body.EMAILKENNUNG +' '+ req.body.RECHTE_ID);
    var benutzerData = {
        NACHNAME: req.body.NACHNAME,
        VORNAME: req.body.VORNAME,
        EMAILKENNUNG: req.body.EMAILKENNUNG,
        RECHTE_ID: req.body.RECHTE_ID
    };
    console.log(benutzerData);

    benutzer.insert(benutzerData).then(function(id) {
        res.send(JSON.stringify({id: id}));
    });
}

function update(req, res) {
    console.log('update server'+ ' ' + req.body.NACHNAME + ' '+ req.body.VORNAME +' '+ req.body.EMAILKENNUNG +' '+ req.body.RECHTE_ID);
    var benutzerData = {
        NACHNAME: req.body.NACHNAME,
        VORNAME: req.body.VORNAME,
        EMAILKENNUNG: req.body.EMAILKENNUNG,
        RECHTE_ID: req.body.RECHTE_ID
    };

    benutzer.update(benutzerData, req.params.id).then(function() {
        res.send(JSON.stringify(true));
    });
}
function loeschen(req, res) {
    benutzer.remove(req.params.id).then(function() {
        res.send(JSON.stringify(true));
    });
}



module.exports = {
    anlegen:anlegen,
    ausgeben:ausgeben,
    update:update,
    loeschen:loeschen
};