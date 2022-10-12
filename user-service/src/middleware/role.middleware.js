function permit(roles = []) {
  if (typeof roles === 'string') {
    roles = [roles];
  }
  return (req, res, next) => {
    if (req.method === 'OPTIONS') {
      return next();
    }
    if (roles.length && !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Нет доступа' });
    }
    next();
  };
}

module.exports = permit;
