//var controller = require('./controller/controller.js');
var cont_benutzer = require('./controller/cont_benutzer.js');
var cont_repos = require('./controller/cont_repos.js');
var cont_repo = require('./controller/cont_repo.js');
var cont_art = require('./controller/cont_art.js');
var cont_passwort = require('./controller/cont_passwort.js');

var passport    = require('passport');

module.exports = function(app) {


    app.get('/benutzer', passport.authenticate('jwt', { session: false}),cont_benutzer.ausgabeAlle);
    app.get('/benutzer/:id', passport.authenticate('jwt', { session: false}),cont_benutzer.ausgabeEin);
    app.post('/benutzer', cont_benutzer.eingabe);
    app.put('/benutzer/:id', passport.authenticate('jwt', { session: false}),cont_benutzer.update);
    app.delete('/benutzer/:id', passport.authenticate('jwt', { session: false}),cont_benutzer.loeschen);
    
    app.get('/repos', passport.authenticate('jwt', { session: false}),cont_repos.ausgabeAlle);   //einzelansicht repo-editieren mit id
    app.get('/repos/:id', passport.authenticate('jwt', { session: false}),cont_repos.ausgabeEin);  //repos eines benutzers ?f

    app.post('/repos', passport.authenticate('jwt', { session: false}),cont_repos.eingabe); //BENUTZTER mit Email einem REPO (ID) Hinzufügen
    app.delete('/repos/:id', passport.authenticate('jwt', { session: false}),cont_repos.loeschen);

    app.get('/repo/:id',passport.authenticate('jwt', { session: false}), cont_repo.ausgabeEin);
    app.post('/repo', passport.authenticate('jwt', { session: false}),cont_repo.eingabe);		//repo-beantragen
    app.put('/repo/:id', passport.authenticate('jwt', { session: false}),cont_repo.update);	//repo-editieren mit id speichern in repo-editieren
    app.delete('/repo/:id', passport.authenticate('jwt', { session: false}),cont_repo.loeschen); //repo-übersicht Funktion2 - löschen
    app.get('/repostatus', passport.authenticate('jwt', { session: false}),cont_repo.repostatus); //Dropdown für Repostatus

    app.get('/repoBenutzer/:id', passport.authenticate('jwt', { session: false}),cont_repo.benutzerDesRepos);
    app.delete('/repoBenutzer/:id/:ID_REPO', passport.authenticate('jwt', { session: false}),cont_repos.loeschen);      // in cont_repo noch nicht vorhanden!!!

    app.get('/art', passport.authenticate('jwt', { session: false}),cont_art.ausgabeAlle);
    app.get('/art/:id', passport.authenticate('jwt', { session: false}),cont_art.ausgabeEin);
    app.get('/artAktiv', passport.authenticate('jwt', { session: false}),cont_art.ausgabeAktiv);  //Ausgabe aktiv geschaltener Repos (REPO_STATUS_ID = 1)
    app.post('/art', passport.authenticate('jwt', { session: false}),cont_art.eingabe);
    app.put('/art/:id', passport.authenticate('jwt', { session: false}),cont_art.update);
    app.delete('/art/:id', passport.authenticate('jwt', { session: false}),cont_art.loeschen);

    //FÜR DEN PASSPORT!

    app.post('/authenticate', cont_passwort.finden);
    // app.get('/benutzer2',  passport.authenticate('jwt', { session: false}),cont_benutzer.ausgabeAlle);

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



