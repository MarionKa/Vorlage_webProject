var mysql = require('mysql');
var dbconfig = require('../config/database');
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


function ausgabeEin_m(id){ //Ausgabe eines Repository auf Basis seiner ID 
    return new Promise(function (resolve, reject) {

        connection.query('SELECT r.ID as ID, r.REPONAME, r.AUTHNAME, group_concat(b.VORNAME, " " ,b.NACHNAME separator "; ") as ALLE_BENUTZER, DATE_FORMAT(r.GUELTIG_BIS, "%d.%m.%Y") AS GUELTIG_BIS, r.ART_ID, a.BEZEICHNUNG as ART, r.REPO_STATUS_ID FROM REPOSITORY r LEFT JOIN VERBINDEN v ON (r.ID = v.REPOSITORY_ID) LEFT JOIN BENUTZER b ON (v.BENUTZER_ID = b.ID) JOIN ART a ON (r.ART_ID = a.ID) WHERE r.ID = ? group by r.ID',[id /*REPO_ID*/], function(err, rows,  fields){

            if (err) {
                reject(err);
            } else {
                 console.log('ausgabeEin_m',rows);
                resolve(rows);
            }  
        });
    });
}

function emailDaten(id) { // Vorbereitet Funktion zur Bereitstellung der Daten für einen Emailversand bei Aktivierung/Änderung eines Repositories ( aktuell nicht Umgesetzt)
    return new Promise(function (resolve, reject) {
        connection.query('SELECT r.ID, concat(a.ORDNERNAME,"/", r.REPONAME) as PFADENDE, group_concat(b.EMAILKENNUNG, "" ,"@th-nuernberg.de" separator "; ") as ALLE_BENUTZER FROM VERBINDEN v JOIN REPOSITORY r ON (v.REPOSITORY_ID = r.ID) JOIN BENUTZER b ON (v.BENUTZER_ID = b.ID) JOIN ART a ON (r.ART_ID = a.ID) WHERE v.REPOSITORY_ID = ? group by v.REPOSITORY_ID ',[id /*REPO_ID*/], function(err, rows,  fields){
            if (err) {
                reject(err);
            } else {
                 console.log('emailDaten',rows);
                resolve(rows);
            }  
        });
    });
}

function repostatus_m(id){ //Ausgabe aller bekannten Repo_Status
    return new Promise(function (resolve, reject) {
        connection.query('SELECT * FROM repo_status;', function(err, rows,  fields){
            if (err) {
                reject(err);
            } else {
                 console.log('repostatus_m',rows);
                resolve(rows);
            }  
        });
    });
}

function benutzerDesRepos_m(id){ //Ausgabe aller Nutzer eines Repositoreis auf Basis der ID
    return new Promise(function (resolve, reject) {
        connection.query('SELECT v.REPOSITORY_ID , b.ID, b.VORNAME,b.NACHNAME, b.EMAILKENNUNG  FROM VERBINDEN v JOIN BENUTZER b ON (v.BENUTZER_ID = b.ID) WHERE v.REPOSITORY_ID = ?', [id /*ID_REPO*/], function(err, rows,  fields){
            if (err) {
                reject(err);
            } else {
                 console.log('benutzerDesRepos_m',rows);
                resolve(rows);
            }  
        });
    });
}

function erstellenAlsUser_m(data) { //Ein Repository erstellen (als normaler User)
    return new Promise(function (resolve, reject) {
        connection.query('INSERT INTO REPOSITORY (ID, REPONAME, AUTHNAME, GUELTIG_BIS, ART_ID, REPO_STATUS_ID) select MAX(R.ID)+1, concat(B.EMAILKENNUNG, "_",A.BEZEICHNUNG), concat("Repository von ", B.VORNAME," ",B.NACHNAME," (",A.BEZEICHNUNG,")"), DATE_ADD( sysdate(), INTERVAL ? month), ?, ? from REPOSITORY R, BENUTZER B, ART A WHERE B.ID =? AND A.ID = ?; INSERT INTO VERBINDEN(BENUTZER_ID, REPOSITORY_ID) select ?, MAX(ID) from REPOSITORY', [ 6/*dauer Gültigkeit in Monaten*/ , data.ART_ID /*ART_ID*/, 1 /*STATUS_ID*/, data.BENUTZER_ID /*Benutzer ID*/, data.ART_ID /*ART_ID*/, data.BENUTZER_ID /*Benutzer ID*/], function (err) {
            if (err) {
                reject(err);
            } else {
                resolve(this.lastID);
               // console.log('erstellenAlsUser_m Erfolgreich');
            }
        });
    });
}


function erstellenAlsAdmin_m(data) { //Ein Repository erstellen (als Administrator)
    return new Promise(function (resolve, reject) {
        connection.query('INSERT INTO REPOSITORY (ID, REPONAME, AUTHNAME, GUELTIG_BIS, ART_ID, REPO_STATUS_ID) select MAX(ID)+1, ?, ?, ?, ?, ? from REPOSITORY; INSERT INTO VERBINDEN(BENUTZER_ID, REPOSITORY_ID) select ?, MAX(ID) from REPOSITORY', [data.REPONAME, data.AUTHNAME, data.GUELTIG_BIS, data.ART_ID /*ART_ID*/, data.REPO_STATUS_ID, data.BENUTZER_ID /*Benutzer ID*/], function (err) {
            if (err) {
                reject(err);
            } else {
                resolve(this.lastID);
                //console.log('erstellenAlsAdmin_m Erfolgreich');
            }
        });
    });
}




function update_m(data, id) { //Aktualisierung eines Repository-Datensatztes
    return new Promise(function (resolve, reject) {
        connection.query('UPDATE REPOSITORY SET REPONAME = ?, AUTHNAME = ?, GUELTIG_BIS = STR_TO_DATE(?,"%d.%m.%Y"), ART_ID = ?, REPO_STATUS_ID = ? WHERE ID = ?', [data.REPONAME, data.AUTHNAME, data.GUELTIG_BIS/*GUELTIG_BIS*/, data.ART_ID /*ART_ID*/,  data.REPO_STATUS_ID /*REPO_STATUS_ID*/, id/*REPOSITORY_ID*/], function (err) {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}


function loeschen_m(id) { //Löschen eines Repositorys inkl. der einträge in der Tabelle Verbinden
    return new Promise(function (resolve, reject) {
        connection.query('DELETE FROM VERBINDEN WHERE REPOSITORY_ID IN (SELECT ID FROM REPOSITORY WHERE REPO_STATUS_ID = ?); Delete FROM REPOSITORY WHERE REPO_STATUS_ID = ?', [id], function (err) {
            if (err) {
                reject(err);
            } else {
                resolve();
               // console.log('Repository gelöscht');
            }
        });
    });
}



doppeltCheck = function (artId, benutzerId) { //kontrollieren ob der Benutzer bereits ein Repository dieser Art hat
    return new Promise(function(resolve,reject){
    connection.query('SELECT v.BENUTZER_ID , r.ART_ID FROM VERBINDEN v JOIN REPOSITORY r ON (v.REPOSITORY_ID = r.ID) WHERE BENUTZER_ID = ? AND ART_ID = ?', [benutzerId, artId ], function(err, rows,  fields) {
        console.log('ergebnis:', rows);
        if (err) {reject();}
        if (rows[0]){ //console.log(' Der Nutzer hat bereits ein Repo dieser Art');
                    reject() ;
        }
        else {  //console.log('Nutzer hat noch kein Repo dieser Art'); 
                 resolve() ;
        }
    });
     
})};







module.exports = {
    ausgabeEin_m: ausgabeEin_m,
    erstellenAlsUser_m: erstellenAlsUser_m,
    erstellenAlsAdmin_m,erstellenAlsAdmin_m,
    update_m: update_m,
    loeschen_m: loeschen_m,
    benutzerDesRepos_m: benutzerDesRepos_m,
    repostatus_m: repostatus_m,
    doppeltCheck: doppeltCheck
};

