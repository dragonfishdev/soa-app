const { DataTypes } = require('sequelize');

module.exports = {
  name: 'creds',
  schema: {
    authId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: 'authIdIndex',
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('ADMIN', 'USER'),
      allowNull: false,
      default: 'USER',
    },
  },
};
