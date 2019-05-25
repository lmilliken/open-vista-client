//NOTE: this file is only active in production

const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const proxy = require('express-http-proxy');
const PORT = process.env.PORT || 7000;
const url = require('url');

// Initialize App
app.listen(PORT, app => console.log('App listening on port ' + PORT + '...'));

// Allow JSON and urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// test
app.get('/test', (req, res) => {
  res.send('/test is working, this is from the CLIENT');
});

// Setup proxy of API routes
//see https://stackoverflow.com/questions/10435407/proxy-with-express-js/32756976#32756976
const apiProxy = proxy('https://open-vista-sdev.herokuapp.com/api', {
  forwardPath: req => url.parse(req.baseUrl).path
});
app.use('/api/*', apiProxy);

// Allow static files
app.use(express.static(path.join(__dirname, 'build')));

app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
