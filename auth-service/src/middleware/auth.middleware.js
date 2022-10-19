const jwt = require('jsonwebtoken');
require('dotenv').config();

function auth(req, res, next) {
  if (req.method === 'OPTIONS') {
    return next();
  }

  try {
    const token = req.headers.authorization.split(' ')[1]; // "Bearer TOKEN"

    if (!token) {
      return res.status(401).json({ message: 'Нет авторизации' });
    }

    const user = jwt.verify(token, process.env.ACCESS_TOKEN_PRIVATE_KEY, { algorithms: 'RS256' });
    if (!user) {
      return res.status(401).json({ message: 'Доступ запрещен' });
    }
    req.user = user;

    return next();
  } catch (e) {
    if (e instanceof jwt.TokenExpiredError) {
      return res.sendStatus(403);
    }
    console.error(e);
    return res.status(500).json({ message: 'Произошла ошибка сервера при проверке доступа' });
  }
}

module.exports = auth;
