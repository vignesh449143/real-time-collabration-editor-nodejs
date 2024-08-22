// models/edit.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Edit = sequelize.define('Edit', {
  documentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Documents',
      key: 'id',
    },
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  changes: {
    type: DataTypes.JSON,
    allowNull: false,
  },
}, {
  timestamps: true,
});

module.exports = Edit;
