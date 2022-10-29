// const { Op } = require('sequelize');
const { User } = require('../models');

async function searchUser(req, res) {
  try {
    const { username } = req.query;
    if (!username) {
      res.status(400).json({ message: 'Требуется передать username в параметре запроса' });
    }
    const candidate = await User.findOne({
      where: { username },
      attributes: ['id', 'username'],
    });

    if (!candidate) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    };

    return res.status(200).json(candidate);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
}

module.exports = searchUser;
