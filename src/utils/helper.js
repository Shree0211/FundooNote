"use strict";
const nodemailer = require("nodemailer");
import dotenv from 'dotenv';
dotenv.config();

export const main = async(email,token) => {

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    service: 'gmail',
    secureConnection: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL, // generated ethereal user
      pass: process.env.PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: process.env.EMAIL, // sender address
    to: email, // list of receivers
    subject: "Forgot Password", // Subject line
    html: `<h1>Hello,<br><br>Click on given link to reset your password!</h1><br><h1>Link:><a href="http://localhost:5000/${token}">click here</a></h1>`
  });
}
