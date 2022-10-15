const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use('/api/auth/', require('./routes/auth.routes'));

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    app.listen(PORT, () => console.log(`App has been started on ${PORT}...`));
  } catch (e) {
    console.log('Server error ', e.message);
    process.exit(1);
  }
}

start();
