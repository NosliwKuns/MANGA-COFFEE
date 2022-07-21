import config from "../../../config/ConfigEntorno/config";
import mail_rover from "../../../config/Nodemailer";
import nodemailer from 'nodemailer';

const sendEmail = async (email: string, subject: string, html:string): Promise<any> => {
    try {       
        const accessToken = mail_rover() 
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth:{
                type: 'oauth2',
                user: config.MAIL,
                clientId: config.CLIENTD_ID,
                clientSecret: config.CLIENTD_SECRET,
                refreshToken: config.CLIENTD_REFRESHTOKEN,
                accessToken: accessToken
            } 
        });
        const mailoptions = {
           from: `Manga-Coffe ${config.MAIL}`,
           to: email,
           subject: subject,
           html: html 
        };
        const respons = await transporter.sendMail(mailoptions);
        return respons;
    } catch (error) {
        console.log('Algo no va bien con el email', error);
    }    
  }

  export default sendEmail;
