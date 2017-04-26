//var controller = require('./controller/controller.js');
var cont_benutzer = require('./controller/cont_benutzer.js');
var cont_repo = require('./controller/cont_repo.js');
var cont_art = require('./controller/cont_art.js');

module.exports = function(app) {
	app.get('/benutzer', controller.fetchAll);
    app.get('/benutzer/:id', controller.fetch);
    app.put('/benutzer/:id', controller.update);
    app.delete('/benutzer/:id', controller.remove);

    app.get('/benutzer', cont_benutzer.ausgabeAlle);
    app.get('/benutzer/:id', cont_benutzer.ausgabeEin);
    app.post('/benutzer', cont_benutzer.eingabe);
    app.put('/benutzer/:id', cont_benutzer.update);
    app.delete('/benutzer/:id', cont_benutzer.loeschen);
    
    app.get('/repository/:id', cont_repo.ausgeben);	//einzelansicht repo-editieren mit id
    app.post('/repository', cont_repo.anlegen);		//repo-beantragen
    app.put('/repository/:id', cont_repo.update);	//repo-editieren mit id speichern in repo-editieren
    app.delete('/repository/:id', cont_repo.loeschen); //repo-übersicht Funktion2 - löschen

    app.get('/art', cont_art.ausgeben);
    app.post('/art/:id', cont_art.anlegen);
    app.put('/art/:id', cont_art.update);
    app.delete('/art/:id', cont_art.loeschen);
};