const express = require('express');

const app = express();

app.use(express.json({ extended: true }));

const PORT = 5000;

async function start() {
  try {
    app.listen(5000, () => console.log(`App has been started on ${PORT}...`));
  } catch (e) {
    console.log('Server error ', e.message);
    process.exit(1);
  }
}

start();
