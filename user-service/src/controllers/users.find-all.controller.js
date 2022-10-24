const { User } = require('../models');

async function findAll(req, res) {
  try {
    const users = await User.findAll();
    return res.json(users);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
}

module.exports = findAll;
