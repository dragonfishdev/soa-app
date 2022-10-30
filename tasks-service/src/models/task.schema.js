const { DataTypes } = require('sequelize');

module.exports = {
  name: 'tasks',
  schema: {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.ENUM('NEW', 'DOING', 'COMPLETED'),
      defaultValue: 'NEW',
    },
    archived: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }
  },
};