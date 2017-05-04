var JwtStrategy = require('passport-jwt').Strategy;


var mysql = require('mysql');
var dbconfig = require('../../database');
var connection = mysql.createConnection(
    dbconfig.connection
);

connection.connect(function(error){
    if(!!error){
        console.log('Error DB, passport');
    } else {
        console.log('Connection sucessfull, passport!');
    }
});
// load up the user model
// var User = require('../app/models/user');
// var config = require('../config/database'); // get db config file
 


// HIER KANN MAN NOCH DES PW MIT VERGLEICHEN

module.exports = function(passport) {
  var opts = {};
  opts.secretOrKey = 'dasIstEinGeheimnis';   /*= config.secret;*/
  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    connection.query("SELECT ID, VORNAME, NACHNAME, EMAILKENNUNG, RECHTE_ID FROM benutzer  WHERE ID = ?",[jwt_payload.id],function(err, rows) {  /*User.findOne({id: jwt_payload.id}, */
          if (err) {
              return done(err, false);
          }
          // if (user) {
          //     done(null, user);
          if (rows) {
              done(null, rows);
          } else {
              done(null, false);
          }
      });
  }));
};