const express = require("express");
const cors = require("cors");

const app = express();

const PORT = 5001;

app.use(cors());
app.use("/mail", require("./routes/mail.routes.js"));

app.listen(PORT, () => console.log(`App has been started on ${PORT}...`));
