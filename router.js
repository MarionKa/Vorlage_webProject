//var controller = require('./controller/controller.js');
var cont_benutzer = require('./controller/cont_benutzer.js');
var cont_repos = require('./controller/cont_repos.js');
var cont_repository = require('./controller/cont_repository.js');
var cont_art = require('./controller/cont_art.js');
var cont_passwort = require('./controller/cont_passwort.js');

var mail = require('./model/mod_mail');

var passport    = require('passport');

module.exports = function(app) {

    app.get('/benutzer', passport.authenticate('jwt', { session: false}),cont_benutzer.ausgabeAlle);
    app.get('/benutzer/:id', passport.authenticate('jwt', { session: false}),cont_benutzer.ausgabeEin);
    app.post('/benutzer', cont_benutzer.anlegen);
    app.put('/benutzer/:id', passport.authenticate('jwt', { session: false}),cont_benutzer.update);
    app.delete('/benutzer/:id', passport.authenticate('jwt', { session: false}),cont_benutzer.loeschen);
    
    app.get('/repos', passport.authenticate('jwt', { session: false}),cont_repos.ausgabeAlle);   //einzelansicht repo-editieren mit id
    app.get('/meineRepos', passport.authenticate('jwt', { session: false}),cont_repos.ausgabePersoenlich);  //repos eines benutzers ?

    app.post('/repos', passport.authenticate('jwt', { session: false}),cont_repos.hinzufügenMitglied); //BENUTZTER mit Email einem REPO (ID) Hinzufügen
    app.delete('/repos/:id', passport.authenticate('jwt', { session: false}),cont_repos.benutzerentfernen);

    app.get('/repo/:id',passport.authenticate('jwt', { session: false}), cont_repository.ausgabeEin);
    app.post('/repo', passport.authenticate('jwt', { session: false}),cont_repository.erstellenAlsAdmin);		//repo-beantragen
    app.post('/repoErstellen', passport.authenticate('jwt', { session: false}),cont_repository.erstellenAlsUser);      //repo-beantragen

    app.put('/repo/:id', passport.authenticate('jwt', { session: false}),cont_repository.update);	//repo-editieren mit id speichern in repo-editieren
    app.delete('/repo', passport.authenticate('jwt', { session: false}),cont_repository.loeschen); //alle gelöschen Repos entfernen
    app.get('/repostatus', passport.authenticate('jwt', { session: false}),cont_repository.repostatus); //Dropdown für Repostatus

    app.get('/repoBenutzer/:id', passport.authenticate('jwt', { session: false}),cont_repository.benutzerDesRepos);
    app.delete('/repoBenutzer/:id/:ID_REPO', passport.authenticate('jwt', { session: false}),cont_repos.benutzerentfernen);      // in cont_repos noch nicht vorhanden!!!

    app.get('/art', passport.authenticate('jwt', { session: false}),cont_art.ausgabeAlle);
    app.get('/art/:id', passport.authenticate('jwt', { session: false}),cont_art.ausgabeEin);
    app.get('/artAktiv', passport.authenticate('jwt', { session: false}),cont_art.ausgabeAktiv);  //Ausgabe aktiv geschaltener Repos (REPO_STATUS_ID = 1)
    app.post('/art', passport.authenticate('jwt', { session: false}),cont_art.eingabe); //Neue Art hinzufügen
    app.put('/art/:id', passport.authenticate('jwt', { session: false}),cont_art.update);
    app.delete('/art/:id', passport.authenticate('jwt', { session: false}),cont_art.loeschen);

    //FÜR DEN PASSPORT!

    app.post('/authenticate', cont_passwort.finden);
    // app.get('/benutzer2',  passport.authenticate('jwt', { session: false}),cont_benutzer.ausgabeAlle);
    app.post('/testmail/:id', mail.emailRepoAktiv);


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



