require("dotenv").config();
const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

const Mails = {};

const setUpNodeMailer = async () => {
  try {
    const accessToken = await oAuth2Client.getAccessToken();
    return nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "plantsocial354@gmail.com",
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });
  } catch (err) {
    return err;
  }
};
Mails.sendPasswordResetMail = async ({ toEmail, url }) => {
  try {
    const transporter = await setUpNodeMailer();
    const mailOptions = {
      from: "plantsocial354@gmail.com",
      to: toEmail,
      subject: "Reset Password",
      text: `Please reset your password on this link: ${url}`,
      html: `<div>\
      <h1>Please reset your password on this link:</h2>\
      <a href="${url}">${url}</a>\
      </div>`,
    };
    const res = await transporter.sendMail(mailOptions);
    return res;
  } catch (err) {
    return err;
  }
};

module.exports = Mails;
