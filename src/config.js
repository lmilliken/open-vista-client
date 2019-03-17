module.exports =
  process.env.NODE_ENV === 'production'
    ? 'https://open-vista-sdev.herokuapp.com'
    : 'http://localhost:5000';
