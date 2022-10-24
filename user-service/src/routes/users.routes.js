const { Router } = require('express');
const { Op } = require('sequelize');
const auth = require('../middleware/user.middleware');
const permit = require('../middleware/role.middleware');
const { User } = require('../models');

const router = Router();

router
  .get('/', auth, // permit('admin'),
    async (req, res) => {
      try {
        console.log(req.user.id);
        const users = await User.findAll();
        return res.json(users);
      } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
      }
    })
  .post('/', // permit('admin'),
    require('../controllers/users.create-user.controller'),
  )
  .get('/search', require('../controllers/users.search.controller'));

// FIXME: Возможная дыра в API
router.get('/:usernameOrId', async (req, res) => {
  try {
    const usernameOrId = req.params.usernameOrId;
    const candidate = await User.findOne({
      where: {
        [Op.or]: {
          id: usernameOrId,
          username: usernameOrId,
        },
      },
      attributes: ['authId', 'email'],
    });

    if (!candidate) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    };

    return res.status(200).json(candidate);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
});

router.post('/:id', auth, permit('admin'), async (req, res) => {
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
