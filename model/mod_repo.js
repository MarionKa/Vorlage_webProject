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

function ausgabe(id) {
    return new Promise(function (resolve, reject) {
        connection.query('SELECT * FROM benutzer WHERE id = ?', [id], function (err, rows, flieds) {
            if (err) {
                reject(err);
                console.log('fetch(id)err ', rows );
            } else {
                console.log('fetch(id)rows ', rows );
                resolve(rows);
            }
        });
    });
}

module.exports = {
    ausgabe:ausgabe
};

