const db = require('./index');

// sync the database
db.database.sync({})
  .then(() => {
    console.log('> sync done!');
    return process.exit(0);
  })
  .catch((err) => {
    throw err.stack || err;
  });
