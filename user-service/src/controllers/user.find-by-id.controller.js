const { User } = require('../models');

async function findById(req, res) {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'Необходимо передать id пользователя' });
    }
    const users = await User.findOne({ where: { id } });
    return res.json(users);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
}

module.exports = findById;
