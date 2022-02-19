import nodemailer from 'nodemailer';

let transporter: any;
const sendEmail = async (email: string, subject: string, message: string) => {
  if (process.env.NODE_ENV === 'production') {
    transporter = nodemailer.createTransport({
      host: 'smtp-mail.outlook.com',
      port: 587,
      auth: {
        user: process.env.OUTLOOK_USERNAME,
        pass: process.env.OUTLOOK_PASSWORD,
      },
    });
  } else if (process.env.NODE_ENV === 'development') {
    transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: 2525,
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
      logger: true,
    });
  }

  const mailOptions = {
    from: 'thetwiteeapp@outlook.com',
    to: email,
    subject: subject,
    html: message,
  };

  transporter.sendMail(mailOptions, function (error: any) {
    if (error) {
      console.log(error.message);
    } else {
      console.log('Message Sent>>>');
    }
  });
};
export default sendEmail;
