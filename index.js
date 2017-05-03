var express = require('express');
var bodyParser = require('body-parser');
var router = require('./router');
var passport	= require('passport');
var jwt         = require('jwt-simple');


var app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

// Use the passport package in our application
app.use(passport.initialize());

router(app);

app.listen(8080, function () {
    console.log('Application is listening on http://localhost:8080');
});

// pass passport for configuration
require('./config/passport')(passport);