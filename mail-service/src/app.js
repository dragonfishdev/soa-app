const express = require("express");
const cors = require("cors");
const MessageBroker = require('./utils/subscriber')

const app = express();


const PORT = 5010;

async function main() {
  const msg = await new MessageBroker().init();
  const data = await msg.subscribe();
  console.log("Success", data); 
}

main()
  .catch(console.log)

app.listen(PORT)

// app.use(cors());
// app.use("/mail", require("./routes/mail.routes.js"));

// app.listen(PORT, () => console.log(`App has been started on ${PORT}...`));
