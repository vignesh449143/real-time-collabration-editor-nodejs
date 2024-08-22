// models/DocumentVersion.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Document = require('./document');

const DocumentVersion = sequelize.define('DocumentVersion', {
  documentId: {
    type: DataTypes.INTEGER,
    references: {
      model: Document,
      key: 'id',
    },
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  version: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: true,
});

Document.hasMany(DocumentVersion, { foreignKey: 'documentId' });
DocumentVersion.belongsTo(Document, { foreignKey: 'documentId' });

module.exports = DocumentVersion;
