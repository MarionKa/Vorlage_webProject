var mysql = require('mysql');
var variablen = require('../config/variablen')
var dbconfig = require('../config/database');
var connection = mysql.createConnection(
    dbconfig.connection
);

connection.connect(function(error){
    if(!!error){
        console.log('Error DB, mod_art');
    } else {
        console.log('Connection sucessfull, mod_art!');
    }
});

function ausgabeAlle_m(){ // Ausgabe aller eingetragenen Arten
    return new Promise(function (resolve, reject) {
        connection.query('SELECT * FROM ART', function(err, rows, fields){
            if (err) {
                reject(err);
            } else {
               // console.log('ART.ausgabeAlle_m ',rows);
                resolve(rows);
            }  
        });
    });
}


function ausgabeEin_m(id) { //Ausgabe einer Art auf Basis der ID
    return new Promise(function (resolve, reject) {
        connection.query('SELECT * FROM ART WHERE id = ?', [id /*ID*/], function (err, rows, fields) {
            if (err) {
                reject(err);
            } else {
                //console.log('ART.ausgabeEin_m', rows );
                resolve(rows);
            }
        });
    });
}

function ausgabeAktiv_m() { //Ausgabe aller aktiven Arten
    return new Promise(function (resolve, reject) {
        connection.query('SELECT * FROM ART WHERE EINTRAGEN_MGL = 1', function (err, rows, fields) {
            if (err) {
                reject(err);
            } else {
               // console.log('ART.ausgabeAktiv_m', rows );
                resolve(rows);
            }
        });
    });
}


function eingabe_m(data) { //Hinzufügen einer neuen Art
    return new Promise(function (resolve, reject) {
        connection.query('INSERT INTO ART (ID, BEZEICHNUNG, ORDNERNAME, EINTRAGEN_MGL) select MAX(ID)+1, ?, ?, ? from ART', [data.BEZEICHNUNG, data.ORDNERNAME, data.EINTRAGEN_MGL], function (err) {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

function update_m(data, id) { //Ändern einer Art. Ändern des Ordnernamens nicht Möglich, da bereits Repositories auf dem Server sein können.
    return new Promise(function (resolve, reject) {
        connection.query('UPDATE ART SET BEZEICHNUNG = ?, EINTRAGEN_MGL = ? WHERE id = ?', [data.BEZEICHNUNG, data.EINTRAGEN_MGL, id /*ID*/], function (err) {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

function loeschen_m(id) { //Löschen einer Art
    return new Promise(function (resolve, reject) {
        connection.query('SELECT * FROM repository WHERE ART_ID = ?', [ id ], function(err, rows, fields) {
            if(rows[0].ART_ID == id ) {
                var data = {
                    meldung: 'löschen nicht möglich'
                    };
                resolve(data);
                //console.log('Ordner kann nicht gelöscht werden: ', data.meldung);

            }else {
               // console.log('Rows are empty, yeah',rows);
                connection.query('DELETE FROM ART WHERE id = ?', [ id /*ID*/], function (err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            }
        });
    });
}

module.exports = {
    ausgabeAlle_m: ausgabeAlle_m,
    ausgabeEin_m: ausgabeEin_m,
    ausgabeAktiv_m: ausgabeAktiv_m,
    eingabe_m: eingabe_m,
    update_m: update_m,
    loeschen_m: loeschen_m
};

