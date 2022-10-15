const { validationResult } = require('express-validator');
const { Op } = require('sequelize');

module.exports = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Некорректные данные при входе в систему',
      });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Пользователь не найден' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Неверный пароль, попробуйте снова' });
    }

    const { id, userName, role } = user;

    const token = jwt.sign(
      { user: { id, userName, role } },
      process.env.JWT_SECRET,
    );

    res.json({ token, user: { id, userName, role } });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
};
