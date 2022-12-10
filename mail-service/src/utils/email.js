const nodemailer = require('nodemailer');

async function sendMail({ from = "cortney.raynor44@ethereal.email", to, subject, html }) {
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "cortney.raynor44@ethereal.email",
      pass: "PsP9UKVQvPB3ntt1Ax",
    },
  });
  // send email
  console.log({from, to, subject, html,});
  transporter.sendMail({from, to, subject, html,}, (err, info) => {
    if (err) {
        console.log('Error occurred. ' + err.message);
        return process.exit(1);
    }

    console.log('Message sent: %s', info.messageId);
    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  });   
}

module.exports = sendMail;