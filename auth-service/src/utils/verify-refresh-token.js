const jwt = require('jsonwebtoken');
const { UserToken } = require('../models');

async function verifyRefreshToken(token) {
  const privateKey = process.env.REFRESH_TOKEN_PRIVATE_KEY;
  const { refreshToken } = await UserToken.findOne({ refreshToken: token });
  if (!refreshToken) {
    return null;
  }
  return jwt.verify(token, privateKey);
}

module.exports = verifyRefreshToken;
