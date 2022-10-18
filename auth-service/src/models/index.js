const { Sequelize } = require('sequelize');
const CredSchema = require('./cred.schema');
require('dotenv').config();

const db = {};

const sequelize = new Sequelize(process.env.MYSQL_URI, {});

db.Cred = sequelize.define(CredSchema.name, CredSchema.schema);

db.sequelize = sequelize;

module.exports = db;
