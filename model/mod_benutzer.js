var mysql = require('mysql');
var dbconfig = require('../../database');
var connection = mysql.createConnection(
    dbconfig.connection
);

connection.connect(function(error){
    if(!!error){
        console.log('Error DB, mod_benutzer');
    } else {
        console.log('Connection sucessfull, mod_benutzer!');
    }
});

//Ausgabe aller in der Tabelle vorhandenen Benutzer
function ausgabeAlle_m(){
    return new Promise(function (resolve, reject) {
        connection.query('SELECT b.ID, b.EMAILKENNUNG, b.VORNAME, b.NACHNAME, b.RECHTE_ID, r.BEZEICHNUNG as RECHTE FROM BENUTZER b JOIN RECHTE r ON (b.RECHTE_ID = r.ID)', function(err, rows,  fields){
            if (err) {
                reject(err);
            } else {
                console.log('model Benutzer', rows);
                resolve(rows);
            }  
        });
    });
}

//Ausgabe eines einzigen Benutzers auf Basis seiner ID
function ausgabeEin_m(id){
    return new Promise(function (resolve, reject) {
        connection.query('SELECT b.ID, b.EMAILKENNUNG, b.VORNAME, b.NACHNAME, b.RECHTE_ID, r.BEZEICHNUNG as RECHTE FROM BENUTZER b JOIN RECHTE r ON (b.RECHTE_ID = r.ID) WHERE b.ID = ?', [1 /*ID*/], function(err, rows,  fields){
            if (err) {
                reject(err);
            } else {
                 console.log('hier',rows);
                resolve(rows);
            }  
        });
    });
}

// create: POST
function eingabe_m(data) {
     console.log('Eingabe model: ' + data.NACHNAME +' ' + data.VORNAME+' ' + data.EMAILKENNUNG + '' + data.RECHTE_ID)
    return new Promise(function (resolve, reject) {
        connection.query('INSERT INTO BENUTZER (ID, EMAILKENNUNG, PASSWORT, VORNAME, NACHNAME, RECHTE_ID) select MAX(ID)+1, ?, ?, ?, ?, ? from BENUTZER', [data.EMAILKENNUNG, data.PASSWORT, data.VORNAME, data.NACHNAME, data.RECHTE_ID], function (err) {
            if (err) {
                reject(err);
            } else {
                resolve(this.lastID);
                console.log('data in db');
            }
        });
    });
}

//Aktualisierung eines Benutzer-Datensatztes
function update_m(data, id) {
    console.log('Kommt die ID? ' + data.NACHNAME +' '+ id);
    return new Promise(function (resolve, reject) {
        connection.query('UPDATE BENUTZER SET EMAILKENNUNG = ? , VORNAME = ?, NACHNAME = ? , RECHTE_ID = ? WHERE id = ?', [data.EMAILKENNUNG, data.VORNAME, data.NACHNAME, data.RECHTE_ID, id], function (err) {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

//Löschen eines einzigen Benutzers auf Basis seiner ID
function loeschen_m(id) {
    return new Promise(function (resolve, reject) {
        connection.query('DELETE FROM VERBINDEN WHERE BENUTZER_ID = ?; DELETE FROM BENUTZER WHERE id = ?', [id /*ID*/ , id/*ID --Die gleiche--*/], function (err) {
            if (err) {
                reject(err);
            } else {
                resolve();
                console.log('Hier wird geloescht');
            }
        });
    });
}

module.exports = {
    ausgabeAlle_m: ausgabeAlle_m,
    ausgabeEin_m: ausgabeEin_m,
    eingabe_m: eingabe_m,
    update_m: update_m,
    loeschen_m: loeschen_m
};


