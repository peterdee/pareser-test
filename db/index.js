const Sequelize = require('sequelize');

const keys = require('../bin/keys');

const carsModel = require('./models/cars.model');
const trucksModel = require('./models/trucks.model');

const database = new Sequelize(
  keys.DATABASE.dbname,
  keys.DATABASE.user,
  keys.DATABASE.password,
  {
    host: keys.DATABASE.host,
    logging: false,
    dialect: 'postgres',
  });

const Cars = database.define('Cars', carsModel(Sequelize));
const Trucks = database.define('Trucks', trucksModel(Sequelize));

module.exports.database = database;
module.exports.Cars = Cars;
module.exports.Trucks = Trucks;
