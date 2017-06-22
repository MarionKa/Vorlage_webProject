var jwt         = require('jwt-simple');

var mysql = require('mysql');
var dbconfig = require('../../database');
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


/// HIER ist des passwort mit drin 
function finden_m(data) {
    console.log('finden_m: ' + data.EMAILKENNUNG.toLowerCase());
    return new Promise(function (resolve, reject) {
        connection.query('SELECT ID, EMAILKENNUNG,CONCAT (VORNAME," ",NACHNAME)as NAME, PASSWORT, RECHTE_ID FROM BENUTZER WHERE EMAILKENNUNG = ?', [data.EMAILKENNUNG.toLowerCase()], function(err, rows,  fields) {
            if (err) {
                reject(err)
            }
            if (!rows){
                resolve({success: false, msg: 'Authentication failed. User not found.'});
            } else {
                console.log('PW vergleich '+ data.PASSWORT + ' ? '+rows[0].PASSWORT );
                if(data.PASSWORT == rows[0].PASSWORT){
                    // if user is found and password is right create a token
                    var token = jwt.encode(rows, 'dasIstEinGeheimnis');  // config.secret
                    // return the information including token as JSON
                    resolve({success: true, token: 'JWT ' + token, recht: rows[0].RECHTE_ID, name: rows[0].NAME});
                } else {
                    resolve({success: false, msg: 'Authentication failed. Wrong password.'});        
                
                }
            }
        });
    });
}



adminCheck = function (headers) {
    return new Promise(function(resolve,reject){
    var token = getToken(headers);
    if (token) {
            var decoded = jwt.decode(token, 'dasIstEinGeheimnis');
                console.log('anfang');
    connection.query('SELECT ID, EMAILKENNUNG, PASSWORT, RECHTE_ID FROM BENUTZER WHERE EMAILKENNUNG = ? AND RECHTE_ID = ?', [decoded[0].EMAILKENNUNG, 1 ], function(err, rows,  fields) {
        console.log('ergebnis:', rows);
        if (err) {reject();}
        if (rows[0]){ console.log(' alles gut ');
                     //Authentication failed. User not found.
                    resolve() ;
        }
        else {  console.log('falsche RECHTE_ID '); 
                reject() ; //Welcome in the member area
        }
    });
     }else { console.log(' ohne token '); reject();  } //No token provided.
})};


getTokenID = function (headers) {
    var token = getToken(headers);
    var decoded = jwt.decode(token, 'dasIstEinGeheimnis');
    return decoded[0].ID;    
}



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



module.exports = {
    finden_m: finden_m,
    adminCheck: adminCheck,
    getTokenID: getTokenID
};

