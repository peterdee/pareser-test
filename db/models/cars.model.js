module.exports = Sequelize => ({
  // car maker
  maker: {
    type: Sequelize.STRING,
  },
  // car model
  model: {
    type: Sequelize.STRING,
  },
  // production year
  year: {
    type: Sequelize.STRING,
  },
  // description summary
  summary: {
    type: Sequelize.TEXT,
  },
  // table name
  entityType: {
    defaultValue: 'Cars',
    type: Sequelize.STRING,
  },
});
