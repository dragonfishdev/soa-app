const { Router } = require('express');
const { User } = require('../models');

const router = Router();

router.get('/', async (req, res) => {
  try {
    const users = await User.findAll({ attributes: ['id', 'userName', 'email'] });
    return res.json(users);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
});

router.post('/:id', async (req, res) => {
  try {
    const id = req.params.id;

    const user = await User.findOne({ where: { id } });
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    const { userName, email } = req.body;
    await User.update({ userName, email }, { where: { id } });
    res.status(200).json({ message: 'Пользователь обновлен' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
});

module.exports = router;
