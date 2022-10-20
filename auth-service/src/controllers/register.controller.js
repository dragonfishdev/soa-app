const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const { UserService } = require('../api-services');
const { Cred } = require('../models');

module.exports = async (req, res) => {
  try {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res.status(400).json({
        errors: validationErrors.array(),
        message: 'Некорректные данные при регистрации',
      });
    }

    const {
      username, email, fullname, password,
    } = req.body;

    const { status, data } = await UserService.request(
      '/api/users/',
      'POST',
      { username, email, fullname },
    );
    if (status === 400) {
      return res.status(400).json({ message: 'Пользователь уже существует' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    await Cred.create({ authId: data.authId, password: hashedPassword });

    return res.status(201).json({ message: 'Пользователь создан' });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Что-то пошло не так' });
  }
};
