const UserSchema = require('./user.schema.js');

const { Sequelize } = require('sequelize');

const db = {};

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
});

const model = sequelize.define(UserSchema.modelName, UserSchema.model);

db[model.name] = model;

db.sequelize = sequelize;

module.exports = db;
