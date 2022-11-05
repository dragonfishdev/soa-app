const { Task } = require('../models');

async function findAll(req, res) {
  try {
    const tasks = await Task.findAll({ where: { archived: false } })
    return res.status(201).json(tasks);
  } catch (e) {
    return res.status(500).json({
      message: 'Произошла неизвестная ошибка',
      description: e.message,
    });
  }
}

module.exports = findAll;