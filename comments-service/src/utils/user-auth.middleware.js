function userAuth(req, res, next) {
  if (req.method === 'OPTIONS') {
    return next();
  }

  try {
    const user = req.headers['x-user-data'];

    if (!user) {
      return res.status(403).json({ message: 'Неизвестный пользователь' });
    }
    req.user = JSON.parse(user);
    return next();
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Произошла ошибка сервера при проверке доступа' });
  }
}

module.exports = userAuth;
