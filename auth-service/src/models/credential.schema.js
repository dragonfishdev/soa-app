const { DataTypes } = require('sequelize');

module.exports = {
  name: 'credentials',
  schema: {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('ADMIN', 'USER'),
      default: 'USER',
    },
    requsetChange: {
      type: DataTypes.BOOLEAN,
      default: '1',
    },
  },
};
