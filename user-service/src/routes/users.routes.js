const { Router } = require('express');
const { permit } = require('../../../utils');

const router = Router();

router
  .get('/', permit('ADMIN'), require('../controllers/users.find-all.controller'))
  .post('/', permit('ADMIN'), require('../controllers/users.create-user.controller'))
  .get('/search', require('../controllers/users.search.controller'))
  .post('/:id', permit('ADMIN'), require('../controllers/user.update-user.controller'));

module.exports = router;
