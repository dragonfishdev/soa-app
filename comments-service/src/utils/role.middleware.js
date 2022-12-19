const userAuth = require('./user-auth.middleware');

function permit(roles = []) {
  if (typeof roles === 'string') {
    // eslint-disable-next-line no-param-reassign
    roles = [roles];
  }
  return [
    userAuth,
    (req, res, next) => {
      if (req.method === 'OPTIONS') {
        return next();
      }
      if (roles.length && !roles.some((role) => role.toUpperCase() === req.user.role)) {
        return res.status(403).json({ message: 'Нет доступа' });
      }
      return next();
    },
  ];
}

module.exports = permit;
