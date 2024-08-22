const sequelize = require('../config/database');
const Document = require('./document');
const User = require('./user');
const DocumentVersion = require('./documentVersion');
const db = {
  sequelize,
  Document,
  User,
  DocumentVersion
};

module.exports = db;