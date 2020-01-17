module.exports = {
  apidomain:
    process.env.REACT_APP_ENV === 'production'
      ? 'https://open-vista-sdev.herokuapp.com'
      : 'http://localhost:5000'
};
