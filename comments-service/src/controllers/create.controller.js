const { validationResult } = require('express-validator');
const { Comment } = require('../models');
const { findById } = require('../repositories/tasks.repository');

async function createComment(req, res) {
  try {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res.status(400).json({
        errors: validationErrors.array(),
        message: 'Некорректные данные комментария',
      });
    }

    const { taskId, text } = req.body;    
    const task = await findById(req, taskId);
    if (!task) {
      return res.status(404).json({ message: 'Задача не найдена' });
    }

    const userId = JSON.parse(req.headers['x-user-data']).id;
  
    const comment = await Comment.create({ taskId, userId, text });
    return res.status(201).json(comment);
  } catch (e) {
    return res.status(500).json({
      message: 'Произошла неизвестная ошибка',
      description: e.message,
    });
  }
}

module.exports = createComment;