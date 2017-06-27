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
    var streamMyFile = fs.createWriteStream("Dokumente/myFile.txt");

    streamMyFile.once('open', function(fd) {

        // alleBenutzer (function(err,data){
        //     if (err) {
        //     // error handling code goes here
        //     console.log("ERROR : ",err);            
        // } else {            
        //     // code to execute on data retrieval
        //     console.log("result from db is : ",data); 
        //     var text = 'test';
        //     console.log('daten ', data);
            
            // streamMyFile.write( 'My first 2 \r\n' + data[0].NACHNAME);
            streamMyFile.write("\r\n  My second v\n");
            streamMyFile.write("My second row");
            streamMyFile.end();

        // }    

    // });
    });
        res.send('Ende generieren');

};

    module.exports = {
        generieren: generieren
    };