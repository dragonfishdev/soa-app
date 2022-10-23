const { Sequelize } = require('sequelize');
const CredentialSchema = require('./credential.schema');
const UserTokensSchema = require('./user-token.schema');
require('dotenv').config();

const db = {};

const sequelize = new Sequelize(process.env.MYSQL_URI, {});

db.Credential = sequelize.define(CredentialSchema.name, CredentialSchema.schema);
db.UserToken = sequelize.define(UserTokensSchema.name, UserTokensSchema.schema);

db.sequelize = sequelize;

module.exports = db;
