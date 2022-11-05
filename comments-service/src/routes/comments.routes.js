const { check } = require('express-validator');
const { Router } = require('express');
const { userAuth } = require('../../../utils');

const router = Router();

router
  .post('/',
    userAuth,
    [
      check('text', 'Необходимо добавить комментарий').notEmpty(),
    ],
    require('../controllers/create.controller')
  );

module.exports = router;