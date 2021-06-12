require('dotenv-safe').config();

const { createBullBoard } = require('@bull-board/api');
const { BullAdapter } = require('@bull-board/api/bullAdapter');
const { ExpressAdapter } = require('@bull-board/express');
const Queue = require('bull');
const Auth0Strategy = require('passport-auth0');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const passport = require('passport');
const session = require('express-session');

const { QUEUE } = require('./constants');

const serverAdapter = new ExpressAdapter();

const queues = Object.values(QUEUE).map(queueName => {
  return new Queue(queueName, {
    redis: {
      host: process.env.REDIS_HOST,
    },
  });
});

createBullBoard({
  queues: queues.map(queue => new BullAdapter(queue)),
  serverAdapter,
});

/*
  Configure Passport
*/
const strategy = new Auth0Strategy(
  {
    domain: process.env.AUTH_ZERO_DOMAIN,
    clientID: process.env.AUTH_ZERO_CLIENT_ID,
    clientSecret: process.env.AUTH_ZERO_CLIENT_SECRET,
    callbackURL: '/callback',
  },
  (accessToken, refreshToken, extraParams, profile, done) => {
    return done(null, profile);
  },
);

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

/* 
  Configure Express
*/
const app = express();

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.EXPRESS_SESSION_SECRET,
  }),
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.get(
  '/callback',
  passport.authenticate('auth0', { failureRedirect: '/login' }),
  (req, res) => {
    if (!req.user) {
      throw new Error('user null');
    }

    res.redirect('/');
  },
);

app.get('/login', passport.authenticate('auth0'), (req, res) => {
  res.redirect('/');
});

const requireAuthentication = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/login');
  }
};

app.use('/', requireAuthentication, serverAdapter.getRouter());

app.listen(process.env.PORT || 3002);

console.log(`Application started: http://localhost:3002`);
