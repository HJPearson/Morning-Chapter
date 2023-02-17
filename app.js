// API Key: 5a3ef855536c4b4a65a72ff7dd6de6a9-us13
// Audience ID: 1b3730d610

const mailchimp = require('@mailchimp/mailchimp_marketing');
const express = require('express');
const path = require('path')
const bodyParser = require('body-parser');
const md5 = require('md5');
const flash = require('connect-flash');
// var cookieParser = require('cookie-parser');
const session = require('express-session');
const { cookie } = require('request');

mailchimp.setConfig({
    apiKey: '5a3ef855536c4b4a65a72ff7dd6de6a9-us13',
    server: 'us13'
})

// Url for my audience list
const url = "https://us13.api.mailchimp.com/3.0/lists/1b3730d610";

// async function subscribeUser() {
//     const response = await mailchimp.lists.addListMember(listId, {
//       email_address: subscribingUser.email,
//       status: "pending"
//     });
// }

const listId = '1b3730d610';
// const email = "hjpearson2@gmail.com";

async function validate(subscriberHash, req, res) {
  try {
    const response = await mailchimp.lists.getListMember(listId, subscriberHash);
    console.log(`This user's subscription status is ${response.status}.`);
    if (response.status == 'subscribed') {
      req.flash('email', req.body.email)
      res.redirect('library');
    }
    // else if (response.status == 'pending') {
      
    // }
    else if (response.status == 'unsubscribed') {
      req.flash('failure', 'That email is not currently subscribed to Morning Chapter. Sign up on our home page to gain access to the library.');
      res.redirect('/library-restricted');
    }
    else if (response.status == 'pending') {
      req.flash('failure', 'You have signed up but have not officially opted in by verifying your email. Check your inbox, spam folder, or promotions folder to find our verification email.');
      res.redirect('/library-restricted');
    }
  } 
  catch (e) {
    if (e.status === 404) {
      req.flash('failure', 'That email is not currently subscribed to Morning Chapter. Sign up on our home page to gain access to the library.');
      res.redirect('/library-restricted');
    }
  }
}

// App -------------------------------------------------------------------------------------
const app = express();
const port = process.env.PORT || 5000;

// app.cookieParser(cookie('SecretString'));
app.use(session({
  secret: 'woodsyowllovesmorningchapter',
  cookie: { maxAge: 60000},
  saveUninitialized: true,
  resave: true
}));
app.use(flash());

app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, '/css')));
app.use(express.static(path.join(__dirname, '/images')));
app.use(express.static(path.join(__dirname, '/javascript')));

app.set('view engine', 'ejs');

// Render the home page
app.get('/', (req, res) => {
  res.render('index');
});

// Handle form submission
app.post('/library-restricted', (req, res) => {
    let userEmail = req.body.email;
    const hash = md5(userEmail.toLowerCase());
    validate(hash, req, res);
})

// Render the restricted library
app.get('/library-restricted', (req, res) => {
  const message = req.flash('failure');
  res.render('library-restricted', { message });
});

// Render the full library
app.get('/library', (req, res) => {
  const email = req.flash('email');
  res.render('library', {
    email: email
  });
});

app.listen(port);

