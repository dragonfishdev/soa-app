const { validationResult } = require('express-validator');
const { Comment } = require('../models');
const { findUserById } = require('../repositories/users.repository');

async function findByTask(req, res) {
  try {
    const { taskId } = req.query
    if (!taskId) {
      return res.status(400).json({ message: 'Необходимо передать id задачи в параметре GET запроса' });
    }
    const comments = (await Comment.findAll({ where: { taskId } }))
    const commentsRes = await Promise.all(comments.map(async (comment) => {
      const user = await findUserById(req, comment.userId);
      const { id, taskId, text, createdAt } = comment;
      return { id, taskId, text, createdAt, user }
    }));
    console.log( commentsRes);

    return res.status(200).json(commentsRes);
  } catch (e) {
    return res.status(500).json({
      message: 'Произошла неизвестная ошибка',
      description: e.message,
    });
  }
}

module.exports = findByTask;