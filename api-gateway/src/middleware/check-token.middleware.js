const jwt = require('jsonwebtoken');
require('dotenv').config();

const exludedRoutes = [
  '/api/auth/login',
  '/api/auth/refresh',
];

function checkToken(req, res, next) {
  if (req.method === 'OPTIONS') {
    return next();
  }

  if (exludedRoutes.some((url) => req.originalUrl.includes(url))) {
    return next();
  }

  try {
    const token = req.headers.authorization?.split(' ')?.[1]; // "Bearer TOKEN"

    if (!token) {
      return res.status(401).json({ message: 'Нет авторизации' });
    }

    return jwt.verify(token, process.env.ACCESS_TOKEN_PUBLIC_KEY, { algorithms: 'RS256' }, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Доступ запрещен', details: err.message });
      }
      req.headers['x-user-data'] = JSON.stringify({ id: decoded.id, role: decoded.role });
      return next();
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Произошла ошибка сервера при проверке доступа' });
  }
}

module.exports = checkToken;
