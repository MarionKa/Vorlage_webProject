var express = require('express');
var bodyParser = require('body-parser');
var router = require('./router');

var app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

router(app);

app.listen(8080, function () {
    console.log('Application is listening on http://localhost:8080');
});