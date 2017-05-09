var mysql = require('mysql');
var dbconfig = require('../../database');
var connection = mysql.createConnection(
    dbconfig.connection
);

connection.connect(function(error){
    if(!!error){
        console.log('Error DB, mod_repo');
    } else {
        console.log('Connection sucessfull, mod_repo!');
    }
});

//Ausgabe eines Repository auf Basis seiner ID & der Benutzer des Repos
function ausgabeEin_m(id){
    return new Promise(function (resolve, reject) {
        connection.query('SELECT r.ID, r.REPONAME, r.AUTHNAME,v.BENUTZER_ID, concat(b.VORNAME, ? ,b.NACHNAME) as BENUTZERNAMEN, r.GUELTIG_BIS, a.BEZEICHNUNG as ART, rs.BEZEICHNUNG as REPO_STATUS FROM VERBINDEN v JOIN REPOSITORY r ON (v.REPOSITORY_ID = r.ID) JOIN ART a ON (r.ART_ID = a.ID) JOIN REPO_STATUS rs ON (r.REPO_STATUS_ID = rs.ID) JOIN BENUTZER b ON (v.BENUTZER_ID = b.ID) WHERE v.REPOSITORY_ID = ?',[ ' ', id /*REPO_ID*/], function(err, rows,  fields){
            if (err) {
                reject(err);
            } else {
                 console.log('hier in mod_repo: ',rows);
                resolve(rows);
            }  
        });
    });
}

function eingabe_m(data, id) {
     console.log('Eingabe model: ' + data.REPONAME + ' ' + data.AUTHNAME/*+ data.NACHNAME +' ' + data.VORNAME+' ' + data.EMAILKENNUNG + '' + data.RECHTE_ID*/)
    return new Promise(function (resolve, reject) {
        connection.query('INSERT INTO REPOSITORY (ID, REPONAME, AUTHNAME, GUELTIG_BIS, ART_ID, REPO_STATUS_ID) select MAX(ID)+1, ?, ?, DATE_ADD( sysdate(), INTERVAL ? month), ?, ? from REPOSITORY; INSERT INTO VERBINDEN(BENUTZER_ID, REPOSITORY_ID) select ?, MAX(ID) from REPOSITORY', [data.REPONAME, data.AUTHNAME, 6/*dauer Gültigkeit in Monaten*/ , data.ART_ID /*ART_ID*/, data.REPO_STATUS_ID /*STATUS_ID*/, id /*Benutzer ID*/], function (err) {
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
    console.log('Kommt die ID? ' + data.REPONAME +' '+ id);
    return new Promise(function (resolve, reject) {
        connection.query('UPDATE REPOSITORY SET REPONAME = ?, AUTHNAME = ?, GUELTIG_BIS = STR_TO_DATE(?,"%d.%m.%Y"), ART_ID = ?, REPO_STATUS_ID = ? WHERE ID = ?', [data.REPONAME, data.AUTHNAME, date.GUELTIG_BIS/*GUELTIG_BIS*/, data.ART_ID /*ART_ID*/,  data.REPO_STATUS_ID /*REPO_STATUS_ID*/, id/*REPOSITORY_ID*/], function (err) {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

function loeschen_m(idB, idR) {
    return new Promise(function (resolve, reject) {
        connection.query('DELETE FROM VERBINDEN WHERE REPOSITORY_ID = ?; DELETE FROM REPOSITORY WHERE id = ?', [  id /*ID*/ , id /*ID --Die gleiche--*/], function (err) {
            if (err) {
                reject(err);
            } else {
                resolve();
                console.log('Hier wird geloescht: repo');
            }
        });
    });
}

module.exports = {
    ausgabeEin_m: ausgabeEin_m,
    eingabe_m: eingabe_m,
    update_m: update_m,
    loeschen_m: loeschen_m
};

