var mysql = require('mysql');
var dbconfig = require('../config/database');
var connection = mysql.createConnection(
    dbconfig.connection
);
var variablen = require('../config/variablen')

connection.connect(function(error){
    if(!!error){
        console.log('Error DB, mod_repos');
    } else {
        console.log('Connection sucessfull, mod_repos!');
    }
});


function ausgabeAlle_m(id) { //Ausgabe aller Repositories
    return new Promise(function (resolve, reject) {

        connection.query('SELECT r.ID,  concat(?, a.ORDNERNAME, "/", r.REPONAME) as REPONAME, r.AUTHNAME, group_concat(b.VORNAME, " " ,b.NACHNAME separator "; ") as ALLE_BENUTZER, DATE_FORMAT(r.GUELTIG_BIS, "%d.%m.%Y") AS GUELTIG_BIS, a.BEZEICHNUNG as ART, rs.BEZEICHNUNG as REPO_STATUS FROM REPOSITORY r LEFT JOIN  VERBINDEN v ON (r.ID = v.REPOSITORY_ID ) LEFT JOIN ART a ON (r.ART_ID = a.ID) LEFT JOIN REPO_STATUS rs ON (r.REPO_STATUS_ID = rs.ID) LEFT JOIN BENUTZER b ON (v.BENUTZER_ID = b.ID) group by v.REPOSITORY_ID, r.ID',[variablen.git.Pfadanfang], function (err, rows, fields) {

            if (err) {
                reject(err);
               // console.log('ausgabeAlle_m(id)err ', err );
            } else {
                //console.log('ausgabeAlle_m mod Repos ', rows );
                resolve(rows);
            }
        });
    });
}

function ausgabePersoenlich_m(id){ //Ausgabe aller Repositories eines Nutzers
    return new Promise(function (resolve, reject) {
        connection.query('SELECT r.ID, concat(?, a.ORDNERNAME, "/", r.REPONAME) as REPONAME, r.AUTHNAME, group_concat(b.VORNAME, " " ,b.NACHNAME separator "; ") as ALLE_BENUTZER, DATE_FORMAT(r.GUELTIG_BIS, "%d.%m.%Y") AS GUELTIG_BIS, a.BEZEICHNUNG as ART, rs.BEZEICHNUNG as REPO_STATUS FROM VERBINDEN v JOIN REPOSITORY r ON (v.REPOSITORY_ID = r.ID) JOIN ART a ON (r.ART_ID = a.ID) JOIN REPO_STATUS rs ON (r.REPO_STATUS_ID = rs.ID) JOIN BENUTZER b ON (v.BENUTZER_ID = b.ID) WHERE v.REPOSITORY_ID IN  (SELECT REPOSITORY_ID FROM VERBINDEN WHERE BENUTZER_ID = ?)  group by v.REPOSITORY_ID',[variablen.git.Pfadanfang,id/*BENUTZER_ID*/], function(err, rows,  fields){
            
            if (err) {
                reject(err);
            } else {
                 //console.log('ausgabeEin_m', rows);
                resolve(rows);
            }  
        });
    });
}

function hinzufügenMitglied_m(data) { //Weiteren Zugriffberechtigen zu Repository hinzufügen
 console.log('Eingabe model: ' + data.EMAILKENNUNG + ' ' + data.REPOSITORY_ID)
 return new Promise(function (resolve, reject) {
    connection.query('SELECT ID FROM BENUTZER WHERE EMAILKENNUNG = ? ', [ data.EMAILKENNUNG], function (err, rows) {

        if (err ||  !rows[0] ) {
            console.log('\n\n Benutzer nicht gefunden\n\n')
            if(err){
                var fehler = err;
            }else {
                var fehler = 'Benutzer nicht gefunden';
            }
            resolve(fehler);
        } else {
            //console.log('ID nutzer', rows[0].ID)


            connection.query('INSERT INTO VERBINDEN (BENUTZER_ID,  REPOSITORY_ID) VALUES (?, ?) ', [ rows[0].ID /*Benutzer*/, data.REPOSITORY_ID /*REPO*/], function (err) {
                if (err) {
                    resolve(err);
                } else {
                    resolve(this.lastID);
                    console.log('data in db');
                }
            });
        }
    });
});
}

function benutzerentfernen_m(idB, idR) { //Einen Zugriffberechtigen von Repository entfernen
    return new Promise(function (resolve, reject) {
        //console.log('löschen VERBINDEN eintrag '+ idB + idR);
        connection.query('DELETE FROM VERBINDEN WHERE BENUTZER_ID = ? AND REPOSITORY_ID = ? ', [ idB /*Benutzer*/, idR /*REPO*/], function (err) {
            if (err) {
                resolve(err);
            } else {
                resolve();
                //console.log('Repositorynutzer entfernt');
            }
        });
    });
}

module.exports = {
    ausgabeAlle_m: ausgabeAlle_m,
    ausgabePersoenlich_m: ausgabePersoenlich_m,
    hinzufügenMitglied_m: hinzufügenMitglied_m,
    benutzerentfernen_m: benutzerentfernen_m
};

