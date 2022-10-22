const { UserToken } = require('../models');
const { signToken, tokenTypes } = require('./sign-token');
require('dotenv').config();

async function generateToken(user) {
  try {
    const { userId: id, role } = user;
    const payload = { id, role };
    const accessToken = signToken(payload, tokenTypes.ACCESS);
    const refreshToken = signToken(payload, tokenTypes.REFRESH);

    const userToken = await UserToken.findOne({ where: { userId: id } });
    if (userToken) {
      await userToken.destroy();
    }

    await UserToken.create({ userId: id, refreshToken });
    return Promise.resolve({ accessToken, refreshToken });
  } catch (err) {
    return Promise.reject(err);
  }
}

module.exports = generateToken;
