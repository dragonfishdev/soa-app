const { Task } = require('../models');

async function findById(req, res) {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: 'Не передан id' });
    }
    const task = await Task.findOne({ where: { id } });
    return res.status(201).json(task);
  } catch (e) {
    return res.status(500).json({
      message: 'Произошла неизвестная ошибка',
      description: e.message,
    });
  }
}

module.exports = findById;