module.exports = Sequelize => ({
  // title: year / maker / model
  title: {
    type: Sequelize.STRING,
  },
  // car photo
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
    defaultValue: 'Cars',
    type: Sequelize.STRING,
  },
});
