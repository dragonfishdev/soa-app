const { Router } = require("express");
const nodemailer = require("nodemailer");

const router = Router();

router.post("/send", async (req, res) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: "kavon.dickinson@ethereal.email",
        pass: "wJKVrcvgxbxMqJ8ByS",
      },
    });

    const { to, subject, body: { html }, } = req.body;

    // send email
    await transporter.sendMail({ 
      from: "kavon.dickinson@ethereal.email",
      to, subject, html,
    });
  } catch (e) {
    console.error(e);
  }
});

module.exports = router;
