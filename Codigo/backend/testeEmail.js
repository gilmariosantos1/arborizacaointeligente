import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: true,
  family: 4,
  auth: {
    user: "mentescriativas21@gmail.com",
    pass: "oojhnkhisyanvmtm"
  }
});

transporter.verify()
  .then(() => console.log("SMTP OK"))
  .catch(console.error);