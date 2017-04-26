var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'repoweb',
    multipleStatements: true
});

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

