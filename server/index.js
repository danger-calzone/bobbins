const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { resolve } = require('path');
// const { Sequelize } = require('sequelize');
// const rateLimit = require('express-rate-limit');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('./config/database');
const { User } = require('./models');
const models = require('./models');
const bobbinRoutes = require('./routes/bobbinRoutes');
const userRoutes = require('./routes/userRoutes');
const roleRoutes = require('./routes/roleRoutes');

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

// const loginLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // Limit each IP to 100 login requests per windowMs
//   message:
//     'Too many login attempts from this IP, please try again after 15 minutes',
// });

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    origin: 'http://localhost:3000', // Restrict domains
    credentials: true,
    methods: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200,
  }),
);

const opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.ACCESS_TOKEN_SECRET,
};

// Set up Passport.js middleware
app.use(passport.initialize());

passport.use(
  new LocalStrategy(
    {
      usernameField: 'username', // Field name for the username in the request body
      passwordField: 'password', // Field name for the password in the request body
    },
    async (username, password, done) => {
      try {
        // Find the user in the database by username
        const user = await User.findOne({ where: { username } });

        // If user is not found, return authentication failure
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }

        // Compare the hashed password in the database with the provided password
        const passwordMatch = await bcrypt.compare(password, user.passwordHash);

        // If passwords don't match, return authentication failure
        if (!passwordMatch) {
          return done(null, false, { message: 'Incorrect password.' });
        }

        // If authentication is successful, return the authenticated user
        return done(null, user);
      } catch (error) {
        // If an error occurs, return it to the next middleware
        return done(error);
      }
    },
  ),
);

// Serialize user into the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from the session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

passport.use(
  new JWTStrategy(opts, (jwtPayload, done) => {
    // Example verification logic, you would typically check the database for the user
    User.findByPk(jwtPayload.id)
      .then(user => {
        if (user) {
          // User found, do something with the user object
          console.log(user.toJSON()); // Example: Log user details
          return done(null, user);
        }
        // User not found
        console.log('User not found');
        return done(null, false);
      })
      .catch(error => {
        // Handle any errors that occur during the query
        console.error('Error finding user by ID:', error);
        return done(error, false);
      });
  }),
);

// TODO: Input validation
app.post('/api/login', (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) {
      console.error('Error during authentication:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (!user) {
      // Authentication failed: Send an error response
      return res
        .status(401)
        .json({ error: 'Authentication failed', message: info.message });
    }
    // Generate a signed JSON Web Token (JWT) with the user's ID
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: '1h',
      },
    );

    // Send the token in the response
    return res.status(200).json({ token });
  })(req, res, next);
});

app.post(
  '/api/logout',
  // passport.authenticate('jwt', { session: false }),
  (req, res) => {
    try {
      req.logout(() => {});
      res.status(200).json({ message: 'Success' });
    } catch (error) {
      res.status(500).json({ error: 'Logout failed' });
    }
  },
);

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

app.use(
  '/api/bobbins',
  passport.authenticate('jwt', { session: false }),
  bobbinRoutes,
);

app.use(
  '/api/users',
  passport.authenticate('jwt', { session: false }),
  userRoutes,
);

app.use(
  '/api/roles',
  passport.authenticate('jwt', { session: false }),
  roleRoutes,
);

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
      // eslint-disable-next-line consistent-return
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
