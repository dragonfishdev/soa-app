const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const models = require('./models');

const app = express();

app.use(express.json({ extended: true }));
app.use(cors({
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200, // For legacy browser support
}));

app.use('/api/auth', require('./routes/auth.routes'));

const PORT = 5000;

async function start() {
  try {
    await models.sequelize.sync();

    const admin = await models.User.findOne({ where: { userName: 'admin' } });
    if (!admin) {
      models.User.create({ userName: 'admin', email: 'sabitovka@shkd.bizml.ru', password: await bcrypt.hash('admin', 12) });
    }

    app.listen(5000, () => console.log(`App has been started on ${PORT}...`));
  } catch (e) {
    console.log('Server error ', e.message);
    process.exit(1);
  }
}

start();
