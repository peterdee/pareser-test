const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const parse = require('./routes/parse');
const show = require('./routes/show');

const app = express();

// allow all origins
app.use((req, res, next) => {
  const { origin } = req.headers;
  res.header('Access-Control-Allow-Origin', origin);
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', '*, POST, PATCH, GET, PUT, DELETE, OPTIONS, HEAD, TRACE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, '
    + 'X-Access-Token, X-Refresh-Token, X-XSRF-TOKEN');
  next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/parse', parse);
app.use('/api/show', show);

// resolve invalid routes
app.all('*', (req, res) => res.redirect('/'));

module.exports = app;
