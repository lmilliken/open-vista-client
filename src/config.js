module.exports =
  process.env.NODE_ENV === 'production' ? 'herokuURL' : 'http://localhost:3000';
