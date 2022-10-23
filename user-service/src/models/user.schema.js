const { DataTypes } = require('sequelize');

module.exports = {
  name: 'users',
  schema: {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: 'nameIndex',
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: 'nameIndex',
    },
    fullname: {
      type: DataTypes.STRING,
    },
  },
};
