const { Router } = require('express');
const userAuth = require('../../../utils/user-auth.middleware');

const router = Router();

router
  .post('/', userAuth, require('../controllers/create-task.controller'))
  .put('/:id/status', userAuth, require('../controllers/change-status.controller'));

module.exports = router;