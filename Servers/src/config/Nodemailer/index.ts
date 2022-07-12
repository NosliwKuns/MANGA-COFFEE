import nodemailer from 'nodemailer';
import config from '../ConfigEntorno/config'

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 25 || 465,
    tls: {
        rejectUnauthorized: false
    },
    secure: false, 
    auth: {
      user: config.mail, 
      pass: config.pass, 
    },
  });

  export default transporter;