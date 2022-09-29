const { Router } = require('express');
const { check, validationResult } = require('express-validator');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { User } = require('../models');

const router = Router();

router.post(
  '/register',
  [
    check('email').isEmail(),
    check('password', 'Минимальная длина пароля 6 символов').isLength({ min: 6 }),
    check('userName', 'Имя пользователя не должно быть пустым').not().isEmpty(),
  ],
  async (req, res) => {
    try {
      const validationErrors = validationResult(req);
      if (!validationErrors.isEmpty()) {
        return res.status(400).json({
          errors: validationErrors.array(),
          message: 'Некорректные данные при регистрации',
        });
      }

      const { userName, email, password } = req.body;

      const candidate = await User.findOne({
        where: {
          [Op.or]: {
            email,
            userName,
          },
        },
      });
      if (candidate) {
        return res.status(400).json({ message: 'Пользователь уже существует' });
      };

      const hashedPassword = await bcrypt.hash(password, 12);
      await User.create({ userName, email, password: hashedPassword });

      res.status(201).json({ message: 'Пользователь создан' });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ message: 'Что-то пошло не так' });
    }
  },
);

router.post(
  '/login',
  [
    check('email', 'Неверный логин').normalizeEmail().isEmail(),
    check('password', 'Введите пароль').exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные при входе в систему',
        });
      }

      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Пользователь не найден' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Неверный пароль, попробуйте снова' });
      }

      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET,
        { expiresIn: '5m' },
      );

      res.json({ token, userId: user.id });
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
    }
  },
);

module.exports = router;
