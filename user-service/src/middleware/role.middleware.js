function permit(roles = []) {
  if (typeof roles === 'string') {
    roles = [roles];
  }
  return (req, res, next) => {
    if (req.method === 'OPTIONS') {
      return next();
    }
    console.log(roles.includes(req.user.role), roles, req.user.userRole);
    if (roles.length && !roles.includes(req.user.userRole)) {
      return res.status(403).json({ message: 'Нет доступа' });
    }
    next();
  };
}

module.exports = permit;
