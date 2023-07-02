import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

import { MailConfigValue } from "./mailer.config";

const mailConfig = MailConfigValue.development;

const transporter = nodemailer.createTransport(mailConfig);

export default async (mail: Mail.Options): Promise<void> => {
  try {
    await transporter.sendMail(mail);
  } catch (error) {
    console.log(error);
  }
};
