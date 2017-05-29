//var controller = require('./controller/controller.js');
var cont_benutzer = require('./controller/cont_benutzer.js');
var cont_repos = require('./controller/cont_repos.js');
var cont_repo = require('./controller/cont_repo.js');
var cont_art = require('./controller/cont_art.js');
var cont_passwort = require('./controller/cont_passwort.js');

var passport    = require('passport');

module.exports = function(app) {
	// app.get('/benutzer', controller.fetchAll);
 //    app.get('/benutzer/:id', controller.fetch);
 //    app.put('/benutzer/:id', controller.update);
 //    app.delete('/benutzer/:id', controller.remove);

    app.get('/benutzer', cont_benutzer.ausgabeAlle);
    app.get('/benutzer/:id', cont_benutzer.ausgabeEin);
    app.post('/benutzer', cont_benutzer.eingabe);
    app.put('/benutzer/:id', cont_benutzer.update);
    app.delete('/benutzer/:id', cont_benutzer.loeschen);
    
    app.get('/repos', cont_repos.ausgabeAlle);   //einzelansicht repo-editieren mit id
    app.get('/repos/:id', cont_repos.ausgabeEin);
    app.post('/repos', cont_repos.eingabe);
    app.delete('/repos/:id', cont_repos.loeschen);

    app.get('/repo/:id', cont_repo.ausgabeEin);
    app.post('/repo', cont_repo.eingabe);		//repo-beantragen
    app.put('/repo/:id', cont_repo.update);	//repo-editieren mit id speichern in repo-editieren
    app.delete('/repo/:id', cont_repo.loeschen); //repo-übersicht Funktion2 - löschen

    app.get('/repoBenutzer/:id', cont_repo.benutzerDesRepos);
    app.delete('/repoBenutzer/:id', cont_repos.loeschen);      // in cont_repo noch nicht vorhanden!!!

    app.get('/art', cont_art.ausgabeAlle);
    app.get('/art/:id', cont_art.ausgabeEin);
// zwei gleiche aufrufe:
    app.get('/artAktiv', cont_art.ausgabeAktiv);  //Ausgabe aktiv geschaltener Repos (REPO_STATUS_ID = 1)
    app.post('/art', cont_art.eingabe);
    app.put('/art/:id', cont_art.update);
    app.delete('/art/:id', cont_art.loeschen);

    //FÜR DEN PASSPORT

    app.post('/authenticate', cont_passwort.finden);
    app.get('/benutzer2',  passport.authenticate('jwt', { session: false}),cont_benutzer.ausgabeAllePP);

};




//
// function benutzerDesRepos(id){
//     return new Promise(function (resolve, reject) {
//         connection.query('SELECT v.REPOSITORY_ID , b.ID, b.VORNAME,b.NACHNAME, b.EMAILKENNUNG  FROM VERBINDEN v JOIN BENUTZER b ON (v.BENUTZER_ID = b.ID) WHERE v.REPOSITORY_ID = ?', [id /*ID_REPO*/], function(err, rows,  fields){
//             if (err) {
//                 reject(err);
//             } else {
//                  console.log('hier',rows);
//                 resolve(rows);
//             }  
//         });
//     });
// }



