const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { resolve } = require('path');
const { Sequelize } = require('sequelize');
const rateLimit = require('express-rate-limit');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('./config/database');
const { User } = require('./models');
const models = require('./models');
const bobbinRoutes = require('./routes/bobbinRoutes');

const logger = require('./logger');
const argv = require('./argv');
const port = require('./port');
const setup = require('./middlewares/frontendMiddleware');
const authenticateRegistration = require('./middlewares/authenticateRegistration');
const isDev = process.env.NODE_ENV !== 'production';

db.authenticate()
  .then(() => console.log('Database connected'))
  .catch(err => console.error('Error connecting to database:', err));

const ngrok =
  (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel
    ? // eslint-disable-next-line import/order
      require('ngrok')
    : false;
require('dotenv').config();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 login requests per windowMs
  message:
    'Too many login attempts from this IP, please try again after 15 minutes',
});

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors(),
  // cors({
  //   origin: 'https://yourtrusteddomain.com', // Restrict domains
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  //   allowedHeaders: 'Content-Type,Authorization',
  // }),
);

// Set up the express-session middleware
app.use(
  session({
    secret: process.env.ACCESS_TOKEN_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: true, // Set to true if you are using HTTPS
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  }),
);

// Set up Passport.js middleware
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ where: { username } });

      if (!user) {
        return done(null, false, {
          message:
            'Benevolent dictator has decreed your login information is incorrect.',
        });
      }

      const passwordMatch = bcrypt.compareSync(password, user.passwordHash);
      if (!passwordMatch) {
        return done(null, false, {
          message:
            'Benevolent dictator has decreed your login information is incorrect.',
        });
      }

      return done(null, user);
    } catch (error) {
      console.error('Error in authentication:', error);
      return done(error);
    }
  }),
);

// Serialize user into the sessions
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from the sessions
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

const generateToken = user =>
  jwt.sign(
    { id: user.id, username: user.username },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '1h' },
  );

// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN_VALUE

  if (token == null) {
    return res.sendStatus(401); // if no token, return unauthorized
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403); // if token is not valid or expired
    }

    req.user = user; // set the user to req.user
    next(); // proceed to the next middleware
  });
};

app.post('/api/login', loginLimiter, (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err); // Handle unexpected errors
    }

    if (!user) {
      // Authentication failed: Send an error response
      return res.status(401).json({ error: info.message });
    }

    // Authentication succeeded: Generate token or redirect
    const token = generateToken(user);
    res.cookie('token', token, {
      httpOnly: true,
      secure: true, // Set to true if using HTTPS
    });
    return res.status(200).send({ message: 'Authentication successful' });
  })(req, res, next);
});

app.post('/api/logout', (req, res) => {
  try {
    req.logout(() => res.send({ message: 'success' }));
  } catch (error) {
    console.log('SERVER ERROR:', error);
  }
});

app.post('/api/register', authenticateRegistration, async (req, res) => {
  try {
    const { password, username, secret } = req.body;
    // I need to update this
    if (process.env.SECRET !== secret) {
      throw new Error('Unauthorized');
    }

    // Check if the username already exists in the database
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists.' });
    }

    // Hash the user's password before storing it in the database
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Create a new user in the database
    await User.create({ username, passwordHash, role: 'user' });

    res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

app.use('/api/bobbins', authenticateToken, bobbinRoutes);

// error middleware
app.use((err, req, res, next) => {
  console.log('ERROR', err);
  return res.status(500).json({ message: 'Internal Server Error' });
});

// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
});

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

// use the gzipped bundle
app.get('*.js', (req, res, next) => {
  req.url = req.url + '.gz'; // eslint-disable-line
  res.set('Content-Encoding', 'gzip');
  next();
});

try {
  // Start your app.
  models.sequelize
    .sync()
    .then(() => {
      app.listen(port, host, async err => {
        if (err) {
          return logger.error(err.message);
        }

        // Connect to ngrok in dev mode
        if (ngrok) {
          let url;
          try {
            url = await ngrok.connect(port);
          } catch (e) {
            return logger.error(e);
          }
          logger.appStarted(port, prettyHost, url);
        } else {
          logger.appStarted(port, prettyHost);
        }
      });
    })
    .catch(error => {
      console.error('Error syncing Sequelize models:', error);
    });
} catch (error) {
  console.error('Error starting the server:', error);
}
