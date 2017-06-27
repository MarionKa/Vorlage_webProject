var mysql = require('mysql');
var dbconfig = require('../../database');
var connection = mysql.createConnection(
    dbconfig.connection
    );
var fs = require('fs');

connection.connect(function(error){
    if(!!error){
        console.log('Error DB, mod_skripte');
    } else {
        console.log('Connection sucessfull, mod_skripte!');
    }
});



function alleBenutzer(callback) {
    connection.query('SELECT * FROM BENUTZER', function (err, rows, fields) {
        if (err) {
            callback(err, null);
        }else
        callback(null, rows);
    })
    
};


function generieren(req, res) {
    console.log('generieren')
    var streamBenutzerUeber = fs.createWriteStream("Dokumente/BenutzerUeber.txt");

    streamBenutzerUeber.once('open', function(fd) {

        alleBenutzer (function(err,dataBenutzer){
            if (err) {
            // error handling code goes here
            console.log("ERROR : ",err);            
        } else {   
            for (i = 0; i < dataBenutzer.length; i++) { 
                streamBenutzerUeber.write( dataBenutzer[i].EMAILKENNUNG +' '+ dataBenutzer[i].PASSWORT +'\r\n' );
            }
            streamBenutzerUeber.end();

        }    

    });
    });
    res.send('Ende generieren');

};

module.exports = {
    generieren: generieren
};