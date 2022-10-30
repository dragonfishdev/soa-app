const { Task } = require("../models");

const statuses = ['NEW', 'DOING', 'COMPLETED'];

async function changeStatus(req, res) {
  try {
    const id = req.params.id;
    const { status } = req.body;

    const task = await Task.findOne({ where: { id } });
    task.status = statuses[+status];
    task.save();
    return res.status(200).json(task);
    } catch (e) {
      return res.status(500).json({
        message: 'Что-то пошло не так',
        details: e.message,
      });
  }
}

module.exports = changeStatus;