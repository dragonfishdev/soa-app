const { User } = require('../models');

async function updateUser(req, res) {
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
}

module.exports = updateUser;
