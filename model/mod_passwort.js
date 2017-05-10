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
    console.log('finden_m: ' + data.EMAILKENNUNG);
    return new Promise(function (resolve, reject) {
        connection.query('SELECT ID, EMAILKENNUNG, PASSWORT FROM BENUTZER WHERE EMAILKENNUNG = ?', [data.EMAILKENNUNG], function(err, rows,  fields) {
            if (err) {
                reject(err)
            }
            if (!rows){
                resolve({success: false, msg: 'Authentication failed. User not found.'});
            } else {
                console.log('PW vergleich'+ data.PASSWORT + ' ? '+rows[0].PASSWORT );
                if(data.PASSWORT == rows[0].PASSWORT){
                    // if user is found and password is right create a token
                    var token = jwt.encode(rows, 'dasIstEinGeheimnis');  // config.secret
                    // return the information including token as JSON
                    resolve({success: true, token: 'JWT ' + token});
                } else {
                    resolve({success: false, msg: 'Authentication failed. Wrong password.'});        
                
                }
            }
        });
    });
}



function tokenCheck(headers) {
    var token = getToken(req.headers);
    if (token) {
            var decoded = jwt.decode(token, 'dasIstEinGeheimnis');
    connection.query('SELECT ID, EMAILKENNUNG, PASSWORT FROM BENUTZER WHERE EMAILKENNUNG = ?', [decoded.EMAILKENNUNG], function(err, rows,  fields) {
        if (err) {return err}
        if (!rows){
                     //Authentication failed. User not found.
                    return false;
        }
        else {  
                return true; //Welcome in the member area
        }
    });
     }else { return false  } //No token provided.
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
    tockenCheck: tockenCheck
};

