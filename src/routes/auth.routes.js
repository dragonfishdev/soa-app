const { Router } = require('express');
const { User } = require('../models');

const router = Router();

router.post(
  '/register',
  async (req, res) => {
    try {
      const { userName, email, password } = req.body;

      const candidate = await User.findOne({ where: { email } });
      if (candidate) {
        return res.status(400).json({ message: `Пользователь с email ${email} уже существует` });
      };

      await User.create({ userName, email, password });

      res.status(201).json({ message: 'Пользователь создан' });
    } catch (e) {
      return res.status(500).json({ message: 'Что-то пошло не так' });
    }
  },
);

module.exports = router;
