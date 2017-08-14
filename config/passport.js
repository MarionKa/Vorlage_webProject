var JwtStrategy = require('passport-jwt').Strategy;


var mysql = require('mysql');
var dbconfig = require('../config/database');
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



module.exports = function(passport) {
              // console.log('\n\n passport anfang\n \n\n ');

  var opts = {};
  opts.secretOrKey = 'dasIstEinGeheimnis'; 
  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
// HIER KANN MAN NOCH DAS PW MIT VERGLEICHEN
    connection.query("SELECT ID FROM BENUTZER  WHERE ID = ?",[jwt_payload[0].ID],function(err, rows) { 
          if (err) {
            // console.log('\n\n passport.js if err\n \n\n ');
               done(err, false);
          }
          if (rows) {
              // console.log('\n\npassport.js if rows \n \n\n');
              done(null, rows);
          } else {
            // console.log('\n\n passport.js if else\n \n\n ');
              done(null, false);
          }
      });
  }));
};