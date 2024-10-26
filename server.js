const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./data/database');

const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors');

const app = express();

const port = process.env.PORT || 3000;

const customerController = require('./controllers/customer');

//app.use(bodyParser.json());

app
  .use(bodyParser.json())
  .use(session({
    secret: "secret",
    resave: false ,
    saveUninitialized: true,
  }))
  // This is the basic express session({..}) initialization
  .use(passport.initialize())
  // init passport on every route call
  .use(passport.session())
  //allow passport to use "express-session"
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "POST, GET, PUT, PATCH, OPTIONS, DELETE"
    );
    next();
  })
  .use(cors({method: ['GET','POST','DELETE','UPDATE','PUT','PATCH']}))
  .use(cors({ origin: '*'}))
  .use('/', require('./routes/index.js'));

  passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
  },
  function(accessToken, refreshToken, profile, done){
    //User.findOrCreate({ githubID: profile.id }, function(err, usser){
    return done(null, profile);
    //});
  }
));


// passport requires two functions serializeUser and deserializeUser
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});


// this checks the session user and see if its been set if yes it will display the logged in name otherwise it will show logged out
app.get('/', (req, res) => { 
  res.send(req.session.user !== undefined ? `logged in as ${req.session.user.displayName}` : "Logged out")
});


//this is what github sends back to us
app.get('/github/callback', passport.authenticate('github' , {
  failureRedirect: '/api-docs', session: false}),
(req, res) => {
  // req.user is the user github sends back. this eq.session.user is our user
  req.session.user = req.user;
  res.redirect('/');
  console.log(req.session.user);
});


// This is for Swagger to help out routes will work across site - Need to make sure we can pass headers back and forth GET, POST, PUT, DELETE 
// so we dont get cross site scripting errors
//app.use((reg, res, next) => {
//  res.setHeader('Access-Control-Allow-Origin','*');
//  res.setHeader(
//    'Access-Control-Allow-Header',
//    'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
//  );
//  res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, DELETE, OPTIONS');
///  next();
//});


// app.use('/', require('./routes'));


mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});
