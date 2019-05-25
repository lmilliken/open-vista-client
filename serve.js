//NOTE: this file is only active in production

const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const proxy = require('express-http-proxy');
const PORT = process.env.PORT || 80;

// Initialize App
app.listen(PORT, app => console.log('App listening on port ' + PORT + '...'));

// Allow JSON and urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Setup proxy of API routes
app.use('/api/*', proxy('https://open-vista-sdev.herokuapp.com'));

// Allow static files
app.use(express.static(path.join(__dirname, 'build')));

app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
