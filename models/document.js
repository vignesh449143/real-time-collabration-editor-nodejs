
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('../models/user')

const Document = sequelize.define('Document', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  // version: {
  //   type: DataTypes.INTEGER,
  //   defaultValue: 1,
  // },

  ownerId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },
}, {
  timestamps: true,
});

Document.belongsTo(User, { foreignKey: 'ownerId', as: 'owner' });
module.exports = Document;
