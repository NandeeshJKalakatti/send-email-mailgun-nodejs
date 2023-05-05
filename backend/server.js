const express = require('express');
const dotenv = require('dotenv');
const mg = require('mailgun-js');

dotenv.config();

const mailgun = () =>
  mg({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMIAN,
  });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/api/email', (req, res) => {
  const { subject, message } = req.body;
  mailgun()
    .messages()
    .send(
      {
        from: 'nandeesh <john@mg.yourdomain.com>',
        to: `nandeeshkalakatti96@gmail.com`,
        subject: `${subject}`,
        html: `<p>${message}</p>`,
      },
      (error, body) => {
        if (error) {
          console.log(error);
          res.status(500).send({ message: 'Error in sending email' });
        } else {
          console.log(body);
          res.send({ message: 'Email sent successfully' });
        }
      }
    );
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});
// const dotenv = require('dotenv');
// dotenv.config();

// const API_KEY = process.env.API_KEY;
// const DOMAIN = process.env.DOMAIN;

// const mailgun = require('mailgun-js')
//        ({apiKey: API_KEY, domain: DOMAIN});


// function getMessage() {
//     const body = 'This is a test email using Mailgun from Node.js';
//     return {
//       to: 'nandeeshjkalakatti@gmail.com',
//       from: 'sandboxc85c9d0546e8418cb99440ebf099b9f2.mailgun.org',
//       subject: 'Test email with Node.js and Mailgun',
//       text: body,
//       html: `<strong>${body}</strong>`,
//     };
// }

// async function sendEmail() {
//     try {
//       await mailgun.messages().send(getMessage(), function (error, body) {
//         if(error) console.log(error)
//         else console.log(body);
//       });
//     } catch (error) {
//       console.error('Error sending test email');
//       console.error(error);
//       if (error.response) {
//         console.error(error.response.body)
//       }
//     }
// }

// sendEmail();