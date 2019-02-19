const express = require('express');
const router = express.Router();
const request = require('sync-request');
const emailStorage = require('../services/emailStorage');
const nodemailer = require('nodemailer');

/* GET home page. */
router.get('/', (req, res, next) => {
  function getJoke() {
    let response = request('GET', 'https://api.chucknorris.io/jokes/random');
    let content = JSON.parse(response.getBody('utf8'));
    return content['value'];
  }

  res.render('index', {
    joke: getJoke(),
    emails: emailStorage.getEmails()
  });
});

router.post('/', function (req, res) {
  console.log(req.body.joke);
  emailStorage.setEmails(req.body.emails);

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'chcknrstst@gmail.com',
      pass: '#test1234'
    }
  });

  emailStorage.getEmails().forEach(function (email) {

    let mailOptions = {
      from: 'chcknrstst@gmail.com',
      to: email,
      subject: 'The random Norris joke ',
      html: 'Hi there,' + email + ' the joke about chuck norris for today is: ' + req.body.joke
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

  });

  res.redirect('/');
});

module.exports = router;
