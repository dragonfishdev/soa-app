const { Router } = require('express');
const userAuth = require('../../../utils/user-auth.middleware');

const router = Router();

router
  .get('/', userAuth, require('../controllers/find-all.controller'))
  .post('/', userAuth, require('../controllers/create-task.controller'))
  .get('/:id', userAuth, require('../controllers/find-by-id.controller'))
  .put('/:id/status', userAuth, require('../controllers/change-status.controller'))

module.exports = router;