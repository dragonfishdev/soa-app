const { Sequelize } = require('sequelize');
const UserSchema = require('./user.schema.js');
require('dotenv').config();

const db = {};

const sequelize = new Sequelize(process.env.MYSQL_URI, {});

db.User = sequelize.define(UserSchema.name, UserSchema.schema);

db.sequelize = sequelize;

module.exports = db;
