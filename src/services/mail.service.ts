import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { google } from "googleapis";
import { generateToken } from "./token.service";
import { htmlContent } from "src/utility/helper";
dotenv.config();

// These id's and secrets are loaded from .env file.
const CLIENT_ID = process.env.CLIENT_ID || "";
const CLIENT_SECRET = process.env.CLIENT_SECRET || "";
const REDIRECT_URI = process.env.REDIRECT_URI || "";
const REFRESH_TOKEN = process.env.REFRESH_TOKEN || "";

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

export async function sendMail(
  emailForSend: string = "hanif.shaik@mindinventory.com", /// This is a test email
  userId: Number = -1
): Promise<any> {
  const token = generateToken(userId);

  const verifyUrl = `${process.env.BASE_URL}/api/admin/verify-email/${token}`;

  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL_USER,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken.token || "", // Ensure token is a string
      },
    });

    const mailOptions: nodemailer.SendMailOptions = {
      from: `OYE-TEAM  ${process.env.EMAIL_USER}`,
      to: emailForSend,
      subject: "Hello from gmail using API",
      text: "Hello from gmail email using API",
      html: htmlContent(verifyUrl),
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
}
