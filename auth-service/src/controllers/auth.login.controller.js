const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const { Credential } = require('../models');
const { UserService } = require('../api-services');
const generateToken = require('../utils/generate-tokens');

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

    const userRes = await UserService.request(`/api/users/search?username=${username}`);
    if (userRes.status === 404) {
      return res.status(400).json({ message: 'Неверный логин или пароль' });
    }

    const { id } = userRes.data;
    const user = await Credential.findOne({ where: { userId: id } });
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
