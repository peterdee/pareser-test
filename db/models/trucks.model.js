module.exports = Sequelize => ({
  // truck maker
  maker: {
    type: Sequelize.STRING,
  },
  // truck model
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
    defaultValue: 'Trucks',
    type: Sequelize.STRING,
  },
});
