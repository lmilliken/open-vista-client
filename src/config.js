module.exports = {
  apidomain:
    process.env.REACT_APP_ENV === 'production'
      ? 'https://teamus-api.herokuapp.com'
      : 'http://localhost:5000'
};
