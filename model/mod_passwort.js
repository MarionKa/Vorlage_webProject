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


module.exports = {
    finden_m: finden_m
};

