const jwt = require('jsonwebtoken');
const { UserToken } = require('../models');

function verifyRefreshToken(token) {
  const privateKey = process.env.REFRESH_TOKEN_PRIVATE_KEY;
  return new Promise((resolve, reject) => {
    UserToken.findOne({ where: { refreshToken: token } })
      .then((userToken) => {
        if (!userToken) {
          return reject(new Error('Invalid refresh token'));
        }

        return jwt.verify(
          token,
          privateKey,
          (err, tokenDetails) => {
            if (err) {
              return reject(new Error(err.message));
            }
            return resolve({ tokenDetails });
          },
        );
      });
  });
}

module.exports = verifyRefreshToken;
