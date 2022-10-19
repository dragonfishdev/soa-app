const { validationResult } = require('express-validator');

module.exports = async (req, res) => {
  try {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res.status(400).json({
        errors: validationErrors.array(),
        message: 'Некорректные данные при регистрации',
      });
    }

    const { userName, email } = req.body;

    const candidate = await User.findOne({
      where: {
        [Op.or]: {
          email,
          userName,
        },
      },
    });
    if (candidate) {
      return res.status(400).json({ message: 'Пользователь уже существует' });
    };

    const password = 'test';

    const hashedPassword = await bcrypt.hash(password, 12);
    await User.create({ userName, email, password: hashedPassword });

    return res.status(201).json({ message: 'Пользователь создан' });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Что-то пошло не так' });
  }
}