require('dotenv').config();

const express = require('express');
const app = express();
const { sql } = require('@vercel/postgres');

const bodyParser = require('body-parser');
const path = require('path');

// Create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(express.static('public'));

// Serve static HTML files for the app
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'components', 'home.htm'));
});

// Code for Spotify integration (replace with actual logic)
app.get('/auth/callback', (req, res) => {
  // Handle Spotify authentication and redirection
  res.redirect('/');
});

app.listen(3000, () => console.log('Server ready on port 3000.'));

module.exports = app;
