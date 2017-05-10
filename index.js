var express     = require('express');
var app = express();
var bodyParser  = require('body-parser');
var passport	= require('passport');
var router      = require('./router');
var port = 8080;

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(express.static('public'));



// Use the passport package in our application
app.use(passport.initialize());

router(app);

app.listen(port, function () {
    console.log('Application is listening on http://localhost:' + port);
});

// pass passport for configuration
require('./config/passport')(passport);