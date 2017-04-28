var mysql = require('mysql');
var dbconfig = require('../../database');
var connection = mysql.createConnection(
    dbconfig.connection
);

connection.connect(function(error){
    if(!!error){
        console.log('Error DB');
    } else {
        console.log('Connection sucessfull, mod_art!');
    }
});

function fetchAll(){
    return new Promise(function (resolve, reject) {
        connection.query('', function(err, rows,  fields){
            if (err) {
                reject(err);
            } else {
                // console.log(rows);
                resolve(rows);
            }  
        });
    });
}


function fetch(id) {
    return new Promise(function (resolve, reject) {
        connection.query('SELECT * FROM art WHERE id = ?', [id], function (err, rows, flieds) {
            if (err) {
                reject(err);
                console.log('ftech(id)err ', rows );
            } else {
                console.log('ftech(id)rows ', rows );
                resolve(rows);
            }
        });
    });
}

// //Neue Datensätze anlegen 
function insert(data) {
     console.log('im instert' +' ' + data.NACHNAME +' ' + data.VORNAME+' ' + data.EMAILKENNUNG + '' + data.RECHTE_ID)
    return new Promise(function (resolve, reject) {
        connection.query('INSERT INTO benutzer (ID, NACHNAME, VORNAME, EMAILKENNUNG, RECHTE_ID) SELECT MAX(ID)+1, ?, ?, ?, ? FROM benutzer', [data.NACHNAME, data.VORNAME, data.EMAILKENNUNG, data.RECHTE_ID], function (err) {
            if (err) {
                reject(err);
            } else {
                resolve(this.lastID);
            }
        });
    });
}

function update(data, id) {
    console.log('Kommt die ID? ' + data.NACHNAME +' '+ id);
    return new Promise(function (resolve, reject) {
        connection.query('UPDATE benutzer SET NACHNAME = ?, VORNAME = ?, EMAILKENNUNG = ?, RECHTE_ID = ? WHERE ID = ?', [data.NACHNAME, data.VORNAME, data.EMAILKENNUNG, data.RECHTE_ID, id], function (err) {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

function remove(id) {
    return new Promise(function (resolve, reject) {
        connection.query('DELETE FROM benutzer WHERE ID = ?', [id], function (err) {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

module.exports = {
    fetchAll:fetchAll,
    fetch: fetch,
    insert: insert,
    update: update,
    remove: remove
};

