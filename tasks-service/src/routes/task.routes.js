const { Router } = require('express');

const router = Router();

router
  .get('/', (req, res) => res.json({ message: '12345' }))

module.exports = router;