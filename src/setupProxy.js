const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy('/api/*', { target: 'http://localhost:5000' }));
};

// const proxy = require('http-proxy-middleware');

// const apiURL = require('./config');

// // console.log(apiURL);
// module.exports = function(app) {
//   app.use(proxy('/api', { target: apiURL }));
//   app.use(proxy('/auth', { target: apiURL }));
//   // app.use(
//   //   proxy('/api/profile/update', {
//   //     target: 'http://localhost:5000',
//   //     changeOrigin: true
//   //   })
//   // );
// };
