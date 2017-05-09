var passwort = require('../model/mod_passwort');


function finden (req,res) {
    console.log('cont_passwort.finden', req.body); // + req.body.EMAILKENNUNG + ' '+ req.body.PASSWORT);
    var nutzerData = {
        EMAILKENNUNG: req.body.EMAILKENNUNG,
        PASSWORT: req.body.PASSWORT
    };
    console.log(nutzerData);

    passwort.finden_m(nutzerData).then(function success(isMatch) {
        res.json(isMatch);
        console.log('finden ',isMatch);
    }, function failure(err) {
        res.send(err);
    })
}


module.exports = {
    finden: finden

};