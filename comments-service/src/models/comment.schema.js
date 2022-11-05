const { DataTypes } = require('sequelize');

module.exports = {
  name: 'comments',
  schema: {
    taskId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    text: {
      type: DataTypes.STRING,
    },
  },
};