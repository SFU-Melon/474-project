require("dotenv").config();
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const Mails = {};

const oAuth2Client = new google.auth.OAuth2(
  process.env.OAUTH2_CLIENT_ID,
  process.env.OAUTH2_CLIENT_SECRET,
  process.env.OAUTH2_REDIRECT_URI
);

oAuth2Client.setCredentials({
  refresh_token: process.env.OAUTH2_REFRESH_TOKEN,
});

const accessToken = oAuth2Client.getAccessToken();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: "plantsocial354@gmail.com",
    clientId: process.env.OAUTH2_CLIENT_ID,
    clientSecret: process.env.OAUTH2_CLIENT_SECRET,
    refreshToken: process.env.OAUTH2_REFRESH_TOKEN,
    accessToken: accessToken,
  },
});

transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Mail Sevice is Ready");
  }
});

Mails.sendPasswordResetMail = async ({ toEmail, url }) => {
  try {
    const mailOptions = {
      from: "plantsocial354@gmail.com",
      to: toEmail,
      subject: "Reset Password",
      text: `Please reset your password on this link: ${url}`,
      html: `<div>\
      <h3>Please reset your password on this link:</h3>\
      <a href="${url}">${url}</a>\
      </div>`,
    };
    const res = await transporter.sendMail(mailOptions);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};

module.exports = Mails;
