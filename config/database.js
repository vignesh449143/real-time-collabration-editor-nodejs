const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('uploads', 'trackmyway', 'Gevinst@321!', {
  host: '101.53.134.14',
  dialect: 'mysql',
});

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
