const express = require('express');
const models = require('./models');

const app = express();

app.use(express.json({ extended: true }));

app.use('/api/auth', require('./routes/auth.routes'));

const PORT = 5000;

async function start() {
  try {
    await models.sequelize.sync();
    app.listen(5000, () => console.log(`App has been started on ${PORT}...`));
  } catch (e) {
    console.log('Server error ', e.message);
    process.exit(1);
  }
}

start();
