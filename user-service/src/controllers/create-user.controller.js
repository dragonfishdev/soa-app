const { Op } = require('sequelize');
const { User } = require('../models');

async function createUser(req, res) {
  try {
    const { username, email, fullname } = req.body;
    const candidate = await User.findOne({
      where: {
        [Op.or]: { username, email },
      },
    });

    if (candidate) {
      return res.status(400).json({ message: 'Пользователь уже существует' });
    }

    const users = await User.create({ username, email, fullname });
    return res.json(users);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
}

module.exports = createUser;
