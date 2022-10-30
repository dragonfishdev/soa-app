const { Sequelize } = require('sequelize');
const TaskSchema = require('./task.schema');
require('dotenv').config();

const db = {};

const sequelize = new Sequelize(process.env.MYSQL_URI, {});

db.Task = sequelize.define(TaskSchema.name, TaskSchema.schema);

db.sequelize = sequelize;

module.exports = db;
