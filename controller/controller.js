var benutzer = require('../model/model');

function fetchAll(req, res) {
    benutzer.fetchAll().then(function success(rows) {
        res.send(rows);
        console.log('benutzer ' + rows);
    }, function failure(err) {
        res.send(err);
    })
}

function fetch(req, res) {      //ausgeben
    benutzer.fetch(req.params.id).then(function success(row) {
        res.send(row);
        console.log('fetch controller.js ', row);
    }, function failure(err) {
        res.send(err);
    })
}

function create(req, res) {     //anlegen
    console.log('bin etz aufm server'+ ' ' + req.body.NACHNAME + ' '+ req.body.VORNAME +' '+ req.body.EMAILKENNUNG +' '+ req.body.RECHTE_ID);
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
function remove(req, res) {
    benutzer.remove(req.params.id).then(function() {
        res.send(JSON.stringify(true));
    });
}


module.exports = {
    fetchAll:fetchAll,
    fetch: fetch,
    create: create,
    update: update,
    remove: remove
};