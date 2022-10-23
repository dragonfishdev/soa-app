const jwt = require('jsonwebtoken');

const tokenTypes = {
  ACCESS: {
    key: process.env.ACCESS_TOKEN_PRIVATE_KEY,
    options: {
      expiresIn: '10m',
      algorithm: 'RS256',
    },
  },
  REFRESH: {
    key: process.env.REFRESH_TOKEN_PRIVATE_KEY,
    options: {
      expiresIn: '30d',
    },
  },
};

function signToken(payload, tokenType = tokenTypes.ACCESS) {
  return jwt.sign(
    payload,
    tokenType.key,
    tokenType.options,
  );
}

module.exports = {
  signToken, tokenTypes,
};
