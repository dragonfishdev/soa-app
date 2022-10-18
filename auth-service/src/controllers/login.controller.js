const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Cred } = require('../models');

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

    const { id, role } = user;

    const key = process.env.PRIVATE_KEY;

    const token = jwt.sign(
      { id, role },
      key,
      {
        expiresIn: '5m',
        algorithm: 'RS256',
      },
    );

    return res.json({ token });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
};
