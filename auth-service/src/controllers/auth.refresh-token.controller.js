const { signToken } = require('../utils/sign-token');
const verifyRefreshToken = require('../utils/verify-refresh-token');

module.exports = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      res.status(400).json({
        message: 'Не найден токен обновления в теле запроса',
      });
      return;
    }

    console.log(refreshToken);
    verifyRefreshToken(refreshToken)
      .then(({ tokenDetails }) => {
        const { id, role } = tokenDetails;
        const accessToken = signToken({ id, role });
        res.status(200).json({ accessToken });
      })
      .catch((err) => res.status(400).json({ message: err.message }));
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Что-то пошло не так' });
  }
};
