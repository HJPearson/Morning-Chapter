// API Key: 5a3ef855536c4b4a65a72ff7dd6de6a9-us13
// Audience ID: 1b3730d610

const mailchimp = require('@mailchimp/mailchimp_marketing');
const express = require('express');
const path = require('path')
const bodyParser = require('body-parser');
const md5 = require('md5');
const flash = require('connect-flash');
const session = require('express-session');
var cookieParser = require('cookie-parser');
// const { cookie } = require('request');
// const { redirect } = require('statuses');

mailchimp.setConfig({
    apiKey: '5a3ef855536c4b4a65a72ff7dd6de6a9-us13',
    server: 'us13'
})

// Url for my audience list
const url = "https://us13.api.mailchimp.com/3.0/lists/1b3730d610";

const listId = '1b3730d610';
// const email = "hjpearson2@gmail.com";


// First checks to see if a user is already subscribed. If they aren't, then they will be subscribed. If they are, then they will be notified.
async function subscribeUser(subscriberEmail, subscriberHash, req, res) {
  try {
    const response = await mailchimp.lists.getListMember(listId, subscriberHash);
    // console.log(`This user's subscription status is ${response.status}.`);
    if (response.status == 'subscribed') {
      req.flash('message', "That email is already subscribed to our list. If you aren't seeing our emails, check your promotions, spam, or junk folder.")
      res.redirect('/'); 
    }
    else if (response.status == 'pending') {
      req.flash('message', 'You have already signed up, but you have not officially opted in by verifying your email. Check your inbox, spam folder, or promotions folder to find our verification email.');
      res.redirect('/');
    }
    else if (response.status == 'unsubscribed' || response.status == "archived") {
      await mailchimp.lists.updateListMember(listId, subscriberHash, {
      status: "pending"
    });
      req.flash('sub', "User has subscribed");  // It doesn't actually matter what the message is here. I just need something there to check if sub == 0.
      res.redirect('/');
    }
  } 
  catch (e) {
    // Still need to test for the subcription of a completely new user. I am just waiting to have the redirected page done first *******************************************************************************
    if (e.status === 404) {
      await mailchimp.lists.addListMember(listId, {
      email_address: subscriberEmail,
      status: "pending"
    });
      console.log("Adding a completely new user");
      req.flash('sub', "User has subscribed");  // It doesn't actually matter what the message is here. I just need something there to check if sub == 0.
      res.redirect('/');
    }
  }
}

// Checks to see if a user is subscribed. If so, they will be granted access to the library. If not, they will be told to subscribe.
async function validate(subscriberHash, req, res) {
  try {
    const response = await mailchimp.lists.getListMember(listId, subscriberHash);
    // console.log(`This user's subscription status is ${response.status}.`);
    if (response.status == 'subscribed') {
      req.session.email = req.body.email;
      res.redirect('library');
    }
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


// This function is called when trying to access the library page from the home page. Since cookies are now being used to create lasting sessions,
// I am now checking their subsription status each time they attempt to access the library. If they have unsubscribed since their last visit,
// that session should be terminated and access denied. The function works exactly like 'validate', minus the error messages.
async function authorize(subscriberHash, req, res) {
  try {
    const response = await mailchimp.lists.getListMember(listId, subscriberHash);
    if (response.status == 'subscribed') {
      res.redirect('library');
    }
    else if (response.status == 'unsubscribed') {
      req.session.destroy();
      res.redirect('/library-restricted');
    }
    else if (response.status == 'pending') {
      req.session.destroy();
      res.redirect('/library-restricted');
    }
  } 
  catch (e) {
    if (e.status === 404) {
      req.session.destroy();
      res.redirect('/library-restricted');
    }
  }
}

// App -------------------------------------------------------------------------------------
const app = express();
const port = process.env.PORT || 5000;

app.use(session({
  secret: 'woodsy12qr3w5er-owl23wr4et-loves9o87-morning#%DRFt7cv8JGTubn-chapter$%T$Zrh',
  saveUninitialized: true,
  resave: false,
}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(flash());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/css')));
app.use(express.static(path.join(__dirname, '/images')));
app.use(express.static(path.join(__dirname, '/javascript')));

app.set('view engine', 'ejs');





// Render the home page
app.get('/', (req, res) => {
  const message = req.flash('message');
  const sub = req.flash('sub');
  res.render('index', {
    message: message,
    sub: sub
  });
});

// Handle subscription from home page
app.post('/', (req, res) =>  {
  let userEmail = req.body.email;
  const hash = md5(userEmail.toLowerCase());
  subscribeUser(userEmail, hash, req, res);
})

// // Render the welcome page
// app.get('/welcome', (req, res) => {
//   const email = req.flash('email');
//   res.render('welcome', {
//     email: email
//   });
// });

// Handle validation form submission
app.post('/library-restricted', (req, res) => {
    let userEmail = req.body.email;
    const hash = md5(userEmail.toLowerCase());
    validate(hash, req, res);
})

// Render the restricted library
app.get('/library-restricted', (req, res) => {
  console.log(req.session.email);
  if (req.session.email != undefined) {
    const hash = md5(req.session.email.toLowerCase());
    authorize(hash, req, res);
  }
  else {
    const message = req.flash('failure');
    res.render('library-restricted', { message });
  }
});

// Render the full library
app.get('/library', (req, res) => {
  const email = req.session.email;
  console.log(req.session.email)
  res.render('library', {
    email: email
  });
});

app.listen(port);