const { Router } = require('express');
const { check } = require('express-validator');
const permit = require('../middleware/role.middleware');

const router = Router();

router.post(
  '/register',
  [
    check('username', 'Имя пользователя не должно быть пустым').exists(),
    check('email', 'Email не может быть пустым').isEmail(),
    check('password', 'Пароль не может быть пустым').exists(),
  ],
  permit('ADMIN'),
  require('../controllers/register.controller'),
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
