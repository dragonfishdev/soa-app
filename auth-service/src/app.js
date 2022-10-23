const express = require('express');
const cors = require('cors');
const models = require('./models');
require('dotenv').config();

const app = express();

app.use(express.json({ extended: true }));
app.use(cors());
app.use('/api/auth/', require('./routes/auth.routes'));

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    await models.sequelize.sync();
    app.listen(PORT, () => console.log(`App has been started on ${PORT}...`));
  } catch (e) {
    console.log('Server error ', e.message);
    process.exit(1);
  }
}

start();
