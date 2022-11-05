const { Sequelize } = require('sequelize');
const CommentSchema = require('./comment.schema');
require('dotenv').config();

const db = {};

const sequelize = new Sequelize(process.env.MYSQL_URI, {});

db.Comment = sequelize.define(CommentSchema.name, CommentSchema.schema);

db.sequelize = sequelize;

module.exports = db;
