import { google } from 'googleapis';
import config from '../ConfigEntorno/config';

const mail_rover = async () =>{
  const oAuth2Client = new google.auth.OAuth2(
    config.CLIENTD_ID,
    config.CLIENTD_SECRET,
    config.URI_REDIRECT
  );
  oAuth2Client.setCredentials({ refresh_token: config.CLIENTD_REFRESHTOKEN});
  const accessToken = await oAuth2Client.getAccessToken();
  return accessToken;
}

  export default mail_rover;
