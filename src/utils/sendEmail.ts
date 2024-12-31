import nodemailer from 'nodemailer';
import config from '../config';

export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: config.NODE_ENV === 'production',
    auth: {
      user: 'z.abdurrahim5@gmail.com',
      pass: 'dlbl xrta ahvj rlzi',
    },
  });
  await transporter.sendMail({
    from: 'z.abdurrahim5@gmail.com', // sender address
    to,
    subject: 'Resset password link', // Subject line
    text: 'The link is valid for 10 min', // plain text body
    html,
  });
};
