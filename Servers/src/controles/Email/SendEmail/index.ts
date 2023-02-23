import config from "../../../config/ConfigEntorno/config";
import mail_rover from "../../../config/Nodemailer";
import nodemailer from "nodemailer";

const sendEmail = async (
  email: string,
  subject: string,
  html: string
): Promise<any> => {
  try {
    // const accessToken = mail_rover();
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: config.MAIL,
        pass: 'cdvgdwfbaaictftr',
      },
    });
    const mailoptions = {
      from: `Manga-Coffe ${config.MAIL}`,
      to: email,
      subject: subject,
      html: html,
    };
    const respons = await transporter.sendMail(mailoptions);
    return respons;
  } catch (error) {
    console.log("Oh no!! , Something went wrong with the email", error);
  }
};

export default sendEmail;
