//NOTE: this file is only active in production

const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const proxy = require('express-http-proxy');
const PORT = process.env.PORT || 7000;
const url = require('url');
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');
// Initialize App
app.listen(PORT, app => console.log('App listening on port ' + PORT + '...'));

// Allow JSON and urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(
  cookieSession({
    keys: process.env.COOKIE_KEY || 'lkdjf8c8889',
    name: 'MY Session',
    secret: 'secret',
    domain: '.herokuapp.com',
    maxAge: 30 * 24 * 60 * 60 * 1000
  })
); //attaches information to req.session
const cors = require('cors');
app.use(cors({ credentials: true }));

// test
app.get('/test', (req, res) => {
  res.send('/test is working, this is from the CLIENT');
});

app.get('/redirect', (req, res) => {
  console.log('request headers: ', req.headers);
  res.send('redirect place');
});

// Allow static files
app.use(express.static(path.join(__dirname, 'build')));

// Setup proxy of API routes
// see https://stackoverflow.com/questions/10435407/proxy-with-express-js/32756976#32756976
const apiProxy = proxy('https://open-vista-sdev.herokuapp.com/api', {
  forwardPath: req => url.parse(req.baseUrl).path
});
app.use('/api/*', apiProxy);

const authProxy = proxy('https://open-vista-sdev.herokuapp.com/auth', {
  forwardPath: req => url.parse(req.baseUrl).path
});
app.use('/auth/*', authProxy);

// finally, if you get here, you want a file or route from the React static build
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
