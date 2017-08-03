var mysql = require('mysql');
var dbconfig = require('../config/database');
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

function alleRepositories(callback) {
    connection.query('SELECT * FROM REPOSITORY WHERE REPO_STATUS_ID = 2', function (err, rows, fields) {
        if (err) {
            callback(err, null);
        }else
        callback(null, rows);
    })
    
};

function alleBenutzer(callback) {
    connection.query('SELECT * FROM BENUTZER', function (err, rows, fields) {
        if (err) {
            callback(err, null);
        }else
        callback(null, rows);
    })
    
};

function alleArten(callback) {
    connection.query('SELECT * FROM ART', function (err, rows, fields) {
        if (err) {
            callback(err, null);
        }else
        callback(null, rows);
    })
    
};

function alleRepositoriesDerArt(id,callback) {
    console.log(id);
    connection.query('SELECT * FROM REPOSITORY WHERE ART_ID = ? AND REPO_STATUS_ID = 2', [id], function (err, rows, fields) {
        if (err) {
            callback(err, null);
        }else
        callback(null, rows);
    })
    
};


function alleUserDieserGruppe(id,callback) {
    console.log(id);
    connection.query('SELECT b.EMAILKENNUNG FROM REPOSITORY r LEFT JOIN VERBINDEN v ON v.REPOSITORY_ID = r.ID LEFT JOIN BENUTZER b ON v.BENUTZER_ID = b.ID WHERE r.ID =  ?;', [id], function (err, rows, fields) {
        if (err) {
            callback(err, null);
        }else
        callback(null, rows);
    })
    
};


var schleifeArten = function (n,dataArten,streamGitConf){
    console.log('Hier ist n'+n);
    if (n < dataArten.length) {

        streamGitConf.write('########################################################\r\n');
        streamGitConf.write( '#'+dataArten[n].BEZEICHNUNG +'\r\n' );
        streamGitConf.write('########################################################\r\n' );

        alleRepositoriesDerArt (dataArten[n].ID,function(err,dataRepo){
            if (err) {
                        // error handling code goes here
                        console.log("ERROR : ",err);            
                    } else {   console.log('else');
                    for (r = 0; r < dataRepo.length; r++) { 
                        streamGitConf.write('<Location /git/'+dataRepo[r].REPONAME +'.git\r\n');
                        streamGitConf.write('   AuthType Basic\r\n');
                        streamGitConf.write('   AuthName "'+ dataRepo[r].AUTHNAME +'"\r\n');
                        streamGitConf.write('   AuthUserFile /var/git/config/passwd.git\r\n');
                        streamGitConf.write('   AuthUserFile /var/git/config/groups.git\r\n');
                        streamGitConf.write('   AuthName "'+ dataRepo[r].AUTHNAME +'"\r\n');
                        streamGitConf.write('   Require group ID_'+dataRepo[r].ID +'\r\n');
                        streamGitConf.write('</Location>\r\n');
                    }
                    streamGitConf.write('\r\n' ); 
                    console.log('nächste Art 1+ '+ n);
                    schleifeArten(n+1,dataArten,streamGitConf);
                }                           

            });
    }           

    if(n == dataArten.length){
        console.log('ende schleifeArten'+n);
        console.log('länge' + dataArten.length)
        streamGitConf.end();
    }
}






var schleifeGruppen = function (n,dataRepos,streamGruppen){
    if (n < dataRepos.length) {
    console.log(dataRepos[n].ID +'Hier ist n'+n);

        streamGruppen.write( 'ID_'+dataRepos[n].ID);

        alleUserDieserGruppe (dataRepos[n].ID,function(err,dataUser){
            if (err) {
                        // error handling code goes here
                        console.log("ERROR : ",err);            
                    } else {   console.log('else');
                    for (r = 0; r < dataUser.length; r++) { 
                        streamGruppen.write(' '+ dataUser[r].EMAILKENNUNG );

                    }
                    streamGruppen.write('\r\n' ); 
                    console.log('nächste Gruppe 1+ '+ n);
                    schleifeGruppen(n+1,dataRepos,streamGruppen);
                }                           

            });
    }           

    if(n == dataRepos.length){
        console.log('ende schleifeGruppen'+n);
        console.log('länge' + dataRepos.length)
        streamGruppen.end();
    }
}








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

    var streamGitConf = fs.createWriteStream("Dokumente/git.conf");
    streamGitConf.once('open', function(fd) {
        alleArten (function(err,dataArten){
            if (err) {
            // error handling code goes here
            console.log("ERROR : ",err);            
        } else {   schleifeArten(0,dataArten,streamGitConf);
        }
    });
    });

    var streamGruppen = fs.createWriteStream("Dokumente/groups.git");
    streamGruppen.once('open', function(fd) {
        alleRepositories (function(err,dataRepos){
            if (err) {
            // error handling code goes here
            console.log("ERROR : ",err);            
        } else {  schleifeGruppen(0,dataRepos,streamGruppen);
    }
});
    });

//HIER WEITERE ZEILEN ZUM VERSCHIEBEN DER FILES EINFÜGEN

    res.send('Ende generieren');
};


module.exports = {
    generieren: generieren
};



















// function generieren(req, res) {
//     console.log('generieren')
//     var streamBenutzerUeber = fs.createWriteStream("Dokumente/BenutzerUeber.txt");

//     streamBenutzerUeber.once('open', function(fd) {

//         alleBenutzer (function(err,dataBenutzer){
//             if (err) {
//             // error handling code goes here
//             console.log("ERROR : ",err);            
//         } else {   
//             for (i = 0; i < dataBenutzer.length; i++) { 
//                 streamBenutzerUeber.write( dataBenutzer[i].EMAILKENNUNG +' '+ dataBenutzer[i].PASSWORT +'\r\n' );
//             }
//             streamBenutzerUeber.end();

//         }    

//     });
//     });

//     var streamGitConf = fs.createWriteStream("Dokumente/git.conf");
//     streamGitConf.once('open', function(fd) {
//         alleArten (function(err,dataArten){
//             if (err) {
//             // error handling code goes here
//             console.log("ERROR : ",err);            
//         } else {   
//             for (a = 0; a < dataArten.length; a++) { 
//                 streamGitConf.write('########################################################\r\n');
//                 streamGitConf.write( dataArten[a].BEZEICHNUNG +'\r\n' );
//                 streamGitConf.write('########################################################\r\n' );

//                 alleRepositoriesDerArt (dataArten[a].ID,function(err,dataRepo){
//                         if (err) {
//                         // error handling code goes here
//                         console.log("ERROR : ",err);            
//                     } else {   console.log('else');
//                         for (r = 0; r < dataRepo.length; r++) { 
//                             streamGitConf.write('<Location /git/'+dataRepo[r].REPONAME +'.git\r\n');
//                             streamGitConf.write('   AuthType Basic\r\n');
//                             streamGitConf.write('   AuthName "'+ dataRepo[r].AUTHNAME +'"\r\n');
//                             streamGitConf.write('   AuthUserFile /var/git/config/passwd.git\r\n');
//                             streamGitConf.write('   AuthUserFile /var/git/config/groups.git\r\n');
//                             streamGitConf.write('   AuthName "'+ dataRepo[r].AUTHNAME +'"\r\n');
//                             streamGitConf.write('   Require group '+dataRepo[r].REPONAME +'.git\r\n');
//                             streamGitConf.write('</Location>\r\n');
//                         }
//                     }                           

//                     });
//                 streamGitConf.write('\r\n' );  

//             }
//         streamGitConf.end();
//         }    

//     });
//     });





//     res.send('Ende generieren');

// };