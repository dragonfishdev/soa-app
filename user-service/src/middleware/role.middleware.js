const auth = require('./auth.middleware');

function permit(roles = []) {
  if (typeof roles === 'string') {
    // eslint-disable-next-line no-param-reassign
    roles = [roles];
  }
  return [
    auth,
    (req, res, next) => {
      if (req.method === 'OPTIONS') {
        return next();
      }
      if (roles.length && !roles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Нет доступа' });
      }
      return next();
    },
  ];
}

module.exports = permit;
