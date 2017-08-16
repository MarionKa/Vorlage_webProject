var mysql = require('mysql');
var dbconfig = require('../config/database');
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


function ausgabeAlle_m(){ //Ausgabe aller in der Tabelle vorhandenen Benutzer
    return new Promise(function (resolve, reject) {
        connection.query('SELECT b.ID, b.EMAILKENNUNG, b.VORNAME, b.NACHNAME, b.RECHTE_ID, r.BEZEICHNUNG as RECHTE FROM BENUTZER b JOIN RECHTE r ON (b.RECHTE_ID = r.ID)', function(err, rows,  fields){
            if (err) {
                reject(err);
            } else {
              //  console.log('model Benutzer', rows);
                resolve(rows);
            }  
        });
    });
}


function ausgabeEin_m(id){  //Ausgabe eines einzigen Benutzers auf Basis seiner ID
    return new Promise(function (resolve, reject) {
        connection.query('SELECT b.ID, b.EMAILKENNUNG, b.VORNAME, b.NACHNAME, b.RECHTE_ID, r.BEZEICHNUNG as RECHTE FROM BENUTZER b JOIN RECHTE r ON (b.RECHTE_ID = r.ID) WHERE b.ID = ?', [id /*ID*/], function(err, rows,  fields){
            if (err) {
                reject(err);
            } else {
               //  console.log('hier',rows);
                resolve(rows);
            }  
        });
    });
}



function anlegen_m(data) { // Fügt einen Benutzer hinzu
    // console.log('Eingabe model: ' + data.NACHNAME +' ' + data.VORNAME+' ' + data.EMAILKENNUNG + '' + data.RECHTE_ID)
    return new Promise(function (resolve, reject) {
        connection.query('INSERT INTO BENUTZER (ID, EMAILKENNUNG, PASSWORT, VORNAME, NACHNAME, RECHTE_ID) select MAX(ID)+1, LOWER(?), ?, ?, ?, ? from BENUTZER', [data.EMAILKENNUNG, data.PASSWORT, data.VORNAME, data.NACHNAME, data.RECHTE_ID/*Hier wird im cont ne 2 gesetzt*/], function (err) {
            if (err) {
                reject(err);
            } else {
                resolve(this.lastID);
                console.log('data in db');
            }
        });
    });
}

function update_m(data, id) { //Aktualisierung eines Benutzers //Emailkennung wird in Kleinbuchstaben gepeichert
   // console.log('Update Benutzer ' + data.NACHNAME +' '+ id);
    return new Promise(function (resolve, reject) {
        connection.query('UPDATE BENUTZER SET EMAILKENNUNG = LOWER(?) , VORNAME = ?, NACHNAME = ? , RECHTE_ID = ? WHERE id = ?', [data.EMAILKENNUNG, data.VORNAME, data.NACHNAME, data.RECHTE_ID, id], function (err) {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

function loeschen_m(id) {//Löschen eines einzigen Benutzers auf Basis seiner ID
    return new Promise(function (resolve, reject) {
        connection.query('DELETE FROM VERBINDEN WHERE BENUTZER_ID = ?; DELETE FROM BENUTZER WHERE id = ?', [id /*ID*/ , id/*ID --Die gleiche--*/], function (err) {
            if (err) {
                reject(err);
            } else {
                resolve();
                console.log('Hier wird geloescht: benutzer');
            }
        });
    });
}


doppeltCheck = function ( emailkennung) { //Kontrollieren ob die Emailadresse bereits einem Benutzer gehört
    return new Promise(function(resolve,reject){
    connection.query('SELECT ID FROM BENUTZER WHERE EMAILKENNUNG = LOWER(?) ', [emailkennung ], function(err, rows,  fields) {
        //console.log('ergebnis doppeltCheck:', rows);
        if (err) {reject();}
        if (rows[0]){ //console.log(' Emailkennung  bereits bekannt ');
                    reject() ;
        }
        else {  //console.log('Emailkennung noch nicht bekannt '); 
                 resolve() ;
        }
    });
     
})};

// benutzerDaten = function( emailkennung){
// return new Promise(function(resolve,reject){
//     console.log ( emailkennung)
//     connection.query('SELECT EMAILKENNUNG, PASSWORT FROM BENUTZER WHERE EMAILKENNUNG = LOWER(?) ', [emailkennung ], function(err, rows,  fields) {
//        // console.log('ergebnis benutzerDaten:', rows[0].PASSWORT);
//         if (err) {reject();}
//         if (rows[0]){ console.log(' benutzer Daten vorhanden');
//                     resolve(rows) ;
//         }
//         else {  console.log(' kein benutzer gefunden '); 
//                  reject() ;
//         }
//     });
     
// })};

module.exports = {
    ausgabeAlle_m: ausgabeAlle_m,
    ausgabeEin_m: ausgabeEin_m,
    anlegen_m: anlegen_m,
    update_m: update_m,
    loeschen_m: loeschen_m,
    doppeltCheck: doppeltCheck
    // ,
    // benutzerDaten: benutzerDaten
};


