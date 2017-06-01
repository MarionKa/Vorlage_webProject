var mysql = require('mysql');
var dbconfig = require('../../database');
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

function ausgabeAlle_m(){
    return new Promise(function (resolve, reject) {
        connection.query('SELECT * FROM ART', function(err, rows, fields){
            if (err) {
                reject(err);
            } else {
                console.log('model Art',rows);
                resolve(rows);
            }  
        });
    });
}


function ausgabeEin_m(id) {
    return new Promise(function (resolve, reject) {
        connection.query('SELECT * FROM ART WHERE id = ?', [id /*ID*/], function (err, rows, fields) {
            if (err) {
                reject(err);
                console.log('ausgabeEin_m(id)err ', rows );
            } else {
                console.log('Aufgabe eine Art ', rows );
                resolve(rows);
            }
        });
    });
}

function ausgabeAktiv_m() {
    return new Promise(function (resolve, reject) {
        connection.query('SELECT * FROM ART WHERE id = 1', function (err, rows, fields) {
            if (err) {
                reject(err);
                console.log('fetch(id)err ', rows );
            } else {
                console.log('Ausgabe aktiv falsch', rows );
                resolve(rows);
            }
        });
    });
}


// //Neue Datensätze anlegen 
function eingabe_m(data) {
     console.log('im instert' +' ' + data.BEZEICHNUNG +' ' + data.ORDNERNAME)
    return new Promise(function (resolve, reject) {
        connection.query('INSERT INTO ART (ID, BEZEICHNUNG, ORDNERNAME, EINTRAGEN_MGL) select MAX(ID)+1, ?, ?, ? from ART', [data.BEZEICHNUNG, data.ORDNERNAME, data.EINTRAGEN_MGL], function (err) {
            if (err) {
                reject(err);
            } else {
                resolve(this.lastID);
            }
        });
    });
}

function update_m(data, id) {
    console.log('Kommt die ID? ' + data.BEZEICHNUNG +' ' + data.ORDNERNAME + ' ' + id);
    return new Promise(function (resolve, reject) {
        connection.query('UPDATE ART SET BEZEICHNUNG = ?, ORDNERNAME = ?, EINTRAGEN_MGL = ? WHERE id = ?', [data.BEZEICHNUNG, data.ORDNERNAME, data.EINTRAGEN_MGL, id /*ID*/], function (err) {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

function loeschen_m(id) {
    return new Promise(function (resolve, reject) {
        connection.query('SELECT * FROM repository WHERE ART_ID = 2', [ id ], function(err, rows, fields) {
            if(rows[0].ART_ID == id ) {
                var data = {
                    meldung: 'löschen nicht möglich'
                    };
                resolve(data);
                //console.log('Ordner kann nicht gelöscht werden: ', data.meldung);

            }else {
                console.log('Rows are empty, yeah',rows);
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

