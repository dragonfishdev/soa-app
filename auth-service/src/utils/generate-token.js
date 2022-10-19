const jwt = require('jsonwebtoken');
const { UserToken } = require('../models');
require('dotenv').config();

async function generateToken(user) {
  try {
    const payload = { id: user.id, role: user.role };
    const accessToken = jwt.sign(
      payload,
      process.env.ACCESS_TOKEN_PRIVATE_KEY,
      {
        expiresIn: '10m',
        algorithm: 'RS256',
      },
    );
    const refreshToken = jwt.sign(
      payload,
      process.env.REFRESH_TOKEN_PRIVATE_KEY,
      {
        expiresIn: '30d',
      },
    );

    const userToken = await UserToken.findOne({ userId: user.id });
    if (userToken) {
      await userToken.destroy();
    }

    await UserToken.create({ userId: user.id, refreshToken });
    return Promise.resolve({ accessToken, refreshToken });
  } catch (err) {
    return Promise.reject(err);
  }
}

module.exports = generateToken;
