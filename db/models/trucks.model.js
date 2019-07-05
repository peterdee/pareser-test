module.exports = Sequelize => ({
  // title: year / maker / model
  title: {
    type: Sequelize.STRING,
  },
  // truck photo
  photo: {
    type: Sequelize.STRING,
  },
  // description summary
  summary: {
    type: Sequelize.TEXT,
  },
  // link to the article
  link: {
    type: Sequelize.TEXT,
  },
  // table name
  entityType: {
    defaultValue: 'Trucks',
    type: Sequelize.STRING,
  },
});
