import { type } from "os";
import { config } from "process";
import { HandelStatus } from "../../config/HandelStatus";

let nodemailer = require("nodemailer");

export class MailConfig {
  from?: string;
  to?: string;
  subject?: string;
  text?: string;
  html?: string;
  attachments?: any;
}
const transporter = nodemailer.createTransport({
  tls: {
    rejectUnauthorized: false,
  },
  pool: true,
  host: "smtp.gmail.com",
  port: process.env.EMAIL_PORT || 587,
  auth: {
    user: "nguyenthaitiep206@gmail.com",
    pass: "nguyentiep",
  },
});
console.log(
  process.env.EMAIL_HOSTNAME,
  process.env.EMAIL_USERNAME,
  process.env.EMAIL_PASSWORD
);

export const SendMail = async (config: MailConfig) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USERNAME,
      to: config.to,
      subject: config.subject || "Thông báo",
      text: config.text || "test",
      html: config.html || null,
      attachments: config.attachments || null,
    });
    return HandelStatus(200);
  } catch (e) {
    console.log(e);

    return HandelStatus(500, e);
  }
};
