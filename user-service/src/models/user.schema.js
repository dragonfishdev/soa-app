const { DataTypes } = require('sequelize');

module.exports = {
  name: 'user',
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
      allowNull: false,
    },
    authId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'auth_id',
    },
  },
};
