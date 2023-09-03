const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const user = require('./user');
const admin = require('./admin');


const app = express();

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Use sessions
app.use(session({
  name: 'sessionIdCookie',
  secret: 'for-prod-env-never-hard-code-your-secret-key-like-i-am',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,
    maxAge: 1000 * 60 * 60 * 24 * 365
  }
}));

// Parse JSON request bodies
app.use(bodyParser.json());

// Use routers
app.use('/api/user', user);
app.use('/api/admin', admin);

// Serve static files from the public directory
app.use(express.static('public')); 

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;
