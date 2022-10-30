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
      allowNull: false,
    },
    archived: {
      type: DataTypes.BOOLEAN,
      default: "false"
    }
  },
};