const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const { Credential } = require('../models');
const { createUser } = require('../repositories/users.repository');

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

    const user = await createUser(req, {
      username, email, fullname, password,
    });
    if (!user) {
      return res.status(400).json({ message: 'Пользователь уже существует' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    await Credential.create({ userId: user.id, password: hashedPassword });

    return res.status(201).json({
      message: 'Пользователь создан',
      user: {
        id: user.id, username, email, fullname,
      },
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Что-то пошло не так' });
  }
};
