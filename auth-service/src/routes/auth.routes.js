const { Router } = require('express');
const { check, validationResult } = require('express-validator');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth.middleware');

const router = Router();

router.post(
  '/register',
  [
    check('userName', 'Имя пользователя не должно быть пустым').not().isEmpty(),
    check('email').isEmail(),
  ],
  auth,
  async (req, res) => {
    return res.sendStatus(200);
    // try {
    //   const validationErrors = validationResult(req);
    //   if (!validationErrors.isEmpty()) {
    //     return res.status(400).json({
    //       errors: validationErrors.a rray(),
    //       message: 'Некорректные данные при регистрации',
    //     });
    //   }

    //   const { userName, email } = req.body;

    //   const candidate = await User.findOne({
    //     where: {
    //       [Op.or]: {
    //         email,
    //         userName,
    //       },
    //     },
    //   });
    //   if (candidate) {
    //     return res.status(400).json({ message: 'Пользователь уже существует' });
    //   };

    //   const password = 'test';

    //   const hashedPassword = await bcrypt.hash(password, 12);
    //   await User.create({ userName, email, password: hashedPassword });

    //   return res.status(201).json({ message: 'Пользователь создан' });
    // } catch (e) {
    //   console.error(e);
    //   return res.status(500).json({ message: 'Что-то пошло не так' });
    // }
  },
);

router.post(
  '/login',
  [
    check('username', 'Неверный логин').exists(),
    check('password', 'Введите пароль').exists(),
  ],
  require('../controllers/login.controller'),
);

module.exports = router;
