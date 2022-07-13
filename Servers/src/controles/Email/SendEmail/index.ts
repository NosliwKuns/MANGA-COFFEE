import config from "../../../config/ConfigEntorno/config";
import transporter from "../../../config/Nodemailer";

const sendEmail = async (email: string, subject: string, html:string) => {
    try {
        
        await transporter.sendMail({
            from: `MHCode <${ config.mail}>`,
            to: email, 
            subject, 
            text: "Manga coffe; plataforma para verdaderos apasionados", 
            html, 
        });

    } catch (error) {
        console.log('Algo no va bien con el email', error);
    }
  }

  export default sendEmail;