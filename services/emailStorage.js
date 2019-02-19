const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);
const nodemailer = require('nodemailer');


// Set some defaults (required if your JSON file is empty)
db.defaults({ emails: [
        'pacuch.martin@gmail.com',
        'mp.AvsP@gmail.com'
    ]}).write();

module.exports = {
    getEmails: function () {
        return db.get('emails').value();
    },
    setEmails: function (emails) {
        db.get('emails').remove().write();

        emails.forEach(function (email) {
            if (email !== '')
                db.get('emails').push(email).write();
        });
    }
};

