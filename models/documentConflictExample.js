// models/document.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const DocumentConflict = sequelize.define('DocumentConflict', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  version: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
}, {
  timestamps: true,
});

module.exports = DocumentConflict;
