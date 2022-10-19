const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const { Cred } = require('../models');
const generateToken = require('../utils/generate-token');

// eslint-disable-next-line no-shadow
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

module.exports = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Некорректные данные при входе в систему',
      });
    }

    const { username, password } = req.body;

    const userRes = await fetch(`http://localhost:5001/api/users/${username}`);
    if (userRes.status === 404) {
      return res.status(404).json({ message: 'Неверный логин или пароль' });
    }

    const { authId } = await userRes.json();
    const user = await Cred.findOne({ where: { authId } });
    if (!user) {
      // TODO: Прикрутить возможность восстановления пароля
      return res.status(500).json({ message: 'Не удалось найти учетные данные авторизации' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Неверный логин или пароль' });
    }

    const { accessToken, refreshToken } = await generateToken(user);
    return res.json({ accessToken, refreshToken });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
};
