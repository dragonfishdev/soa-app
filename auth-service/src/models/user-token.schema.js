const { DataTypes } = require('sequelize');

module.exports = {
  name: 'user-tokens',
  schema: {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    refreshToken: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
};
