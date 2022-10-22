const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const { UserService } = require('../api-services');
const { Credential } = require('../models');

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
    if (status !== 201) {
      throw new Error('Не удалось создать пользователя. Вероятно, произошла ошибка в сервисе пользователей');
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    await Credential.create({ userId: data.id, password: hashedPassword });

    return res.status(201).json({
      message: 'Пользователь создан',
      user: {
        id: data.userId, username, email, fullname,
      },
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Что-то пошло не так' });
  }
};
