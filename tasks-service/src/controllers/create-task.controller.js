const { Task } = require('../models');

async function createTask(req, res) {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({ message: 'Не все поля заполнены' });
    }
  
    const { id, status, archived } = await Task.create({ title, description });
    return res.status(201).json({ title, description, id, status, archived });
  } catch (e) {
    return res.status(500).json({
      message: 'Произошла неизвестная ошибка',
      description: e.message,
    });
  }
}

module.exports = createTask;