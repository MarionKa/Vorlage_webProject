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
              // console.log('\n\n passport anfang\n \n\n ');

  var opts = {};
  opts.secretOrKey = 'dasIstEinGeheimnis';   /*= config.secret;*/
  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
      console.log('\n\n passport use\n \n\n ');

    connection.query("SELECT ID, VORNAME, NACHNAME, EMAILKENNUNG, RECHTE_ID FROM BENUTZER  WHERE ID = ?",[jwt_payload[0].ID],function(err, rows) {  /*User.findOne({id: jwt_payload.id}, */
          if (err) {
            console.log('\n\n passport.js if err\n \n\n ');
               done(err, false);
          }
          if (rows) {
              console.log('\n\npassport.js if rows \n \n\n');
              done(null, rows);
          } else {
            console.log('\n\n passport.js if else\n \n\n ');
              done(null, false);
          }
      });
  }));
};