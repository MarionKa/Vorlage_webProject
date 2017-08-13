var jwt         = require('jwt-simple');

var mysql = require('mysql');
var dbconfig = require('../config/database');
var connection = mysql.createConnection(
    dbconfig.connection
);

connection.connect(function(error){
    if(!!error){
        console.log('Error DB, mod_repos');
    } else {
        console.log('Connection sucessfull, mod_passwort!');
    }
});


function finden_m(data) {  //Anmeldeprocedere
    //console.log('finden_m: ' + data.EMAILKENNUNG.toLowerCase());
    return new Promise(function (resolve, reject) {
        connection.query('SELECT ID, EMAILKENNUNG,CONCAT (VORNAME," ",NACHNAME)as NAME, PASSWORT, RECHTE_ID FROM BENUTZER WHERE EMAILKENNUNG = ?', [data.EMAILKENNUNG.toLowerCase()], function(err, rows,  fields) {
            if (err) {
                reject(err)
            }
            if (!rows){
                resolve({success: false, msg: 'Anmeldung fehlgeschalgen! Nutzer nicht gefunden'});
            } else {
                //console.log('PW vergleich '+ data.PASSWORT + ' ? '+rows[0].PASSWORT );
                if(data.PASSWORT == rows[0].PASSWORT){
                    var token = jwt.encode(rows, 'dasIstEinGeheimnis'); 
                    resolve({success: true, token: 'JWT ' + token, recht: rows[0].RECHTE_ID, name: rows[0].NAME});
                } else {
                    resolve({success: false, msg: 'Anmeldung fehlgeschalgen! Passwort ist falsch.'});        
                
                }
            }
        });
    });
}



adminCheck = function (headers) { //Hat der Nutzer zu dem token Administrator-Rechte
    return new Promise(function(resolve,reject){
    var token = getToken(headers);
    if (token) {
            var decoded = jwt.decode(token, 'dasIstEinGeheimnis');
    connection.query('SELECT ID, EMAILKENNUNG, PASSWORT, RECHTE_ID FROM BENUTZER WHERE EMAILKENNUNG = ? AND RECHTE_ID = ?', [decoded[0].EMAILKENNUNG, 1 ], function(err, rows,  fields) {
        if (err) {reject();}
        if (rows[0]){ /*console.log('Der User ist Admin');*/
                    resolve() ;
        }
        else {  /*console.log('falsche RECHTE_ID ');*/
                reject() ;
        }
    });
     }else { /*console.log(' Es fehlt das Token.');*/ reject();  }
})};


getToken = function (headers) { 
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};


getTokenID = function (headers) {
    var token = getToken(headers);
    var decoded = jwt.decode(token, 'dasIstEinGeheimnis');
    return decoded[0].ID;    
}


module.exports = {
    finden_m: finden_m,
    adminCheck: adminCheck,
    getTokenID: getTokenID
};

