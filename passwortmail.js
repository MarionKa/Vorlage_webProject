/* eslint no-console: 0 */

'use strict';

const nodemailer = require('./lib/nodemailer');

// Create a SMTP transporter object:
let transporter = nodemailer.createTransport({
// Versandt via Gmail:
    service: 'Gmail',
    auth: {
        user: 'projekt.datagit',
        pass:  'projektdatagit'
    },
    }, 
{
    // Angabe der Absenderinformationen:
    from: 'Datagit <projekt.datagit@gmail.com>',
    headers: {
        'X-Laziness-level': 1000 // just an example header, no need to use this
    }
});



//Versandt via TH Mail:
/*	host: 'my.ohmportal.de',
	port: 465,
	secure: true,
//Hier können die Daten der medinfmail einfgefügt werden.
	auth: {
		user: 'Berndtan42907',
		pass: 'XXXXXXXXX'
 	      },
    }, 
    {
    // Angabe der Absenderinformationen:
//  from: 'Repository-Service TH-OHM <Repositorymanagement@th-nuernberg.de>',
    from: 'Repository-Service TH-OHM <berndtan42907@th-nuernberg.de>',
    headers: {
        'X-Laziness-level': 1000 // just an example header, no need to use this
    }
});
*/

console.log('SMTP Configured');
// Message object:
let message = {

    // Comma separated list of recipients
    to: 'Andreas Berndt <abbademeister@gmail.com>',

    // Subject of the message
    subject: 'VERSUCH für Repomanagement TH Nürnberg Medinf Efi', //

    // plaintext body
    text: 's dem Docker Container.',

    // HTML body
    // html: '<p><b>Diese</b> Mail wurde per Javascript mit einer gefakten Hochschuladresse geschickt, direkt aus einem Docker Container.</p>',

};

// Versenden der Mail mit Ausgabe von Stati auf der Kommandozeile:
console.log('Sending Mail');
transporter.sendMail(message, (error, info) => {
    if (error) {
        console.log('Error occurred');
        console.log(error.message);
        return;
    }
    console.log('Message sent successfully!');
    console.log('Server responded with "%s"', info.response);
    transporter.close();
});
