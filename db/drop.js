const db = require('./index');

// drop the database
db.database.sync({
  force: true
}).then(() => {
    console.log('> drop done!');
    return process.exit(0);
  })
  .catch((err) => {
    throw err.stack || err;
  });
