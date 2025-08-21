import nodemailer from "nodemailer";
import hbs, { type NodemailerExpressHandlebarsOptions } from "nodemailer-express-handlebars";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { EMAIL_SERVICE, EMAIL_USER, EMAIL_PASSWORD, EMAIL_PORT } from "./env";
import type { UserProp, MailOptions } from "../types/types";

const __dirname = dirname(fileURLToPath(import.meta.url));

// currently using gmail service/transport. Will update to Zoho domain email.
const transporter = nodemailer.createTransport({
  host: EMAIL_SERVICE,
  port: EMAIL_PORT,
  secure: true, 
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASSWORD,
  },
});

const options: NodemailerExpressHandlebarsOptions = {
  viewEngine: {
    partialsDir: path.resolve(__dirname, "../utils/templates"),
    defaultLayout: false,
  },
  viewPath: path.resolve(__dirname, "../utils/templates"),
};

transporter.use("compile", hbs(options));

export const sendRegisterEmail = async (email: string, username: string) => {
  try {
    await transporter.sendMail({
      from: EMAIL_USER,
      to: email,
      subject: "Welcome to Trophy 🎉",
      template: "newUser",
      context: {
        username,
      },
    } as MailOptions);
  } catch (error) {
    console.error(error);
    throw new Error("Error sending Register mail");
  }
};

export const sendStreamEmail = async (user: UserProp, subject: string) => {
  try {
    await transporter.sendMail({
      from: EMAIL_USER,
      to: user.email,
      template: "stream",
      subject: subject,
      context: {
        username: user.username,
      },
    } as MailOptions);
  } catch (error) {
    console.error(error);
    throw new Error("Error sending stream mail");
  }
};

export const sendScheduleEmail = async (
  user: UserProp,
  subject: string,
  calendarProps: { dtStamp: string; date: string; streamTitle: string; streamLink: String },
) => {
  try {
    const { date, streamLink, streamTitle, dtStamp } = calendarProps;
    const icsCalendarContent = `
      BEGIN:VCALENDAR
      VERSION:2.0
      PRODID:-trophytv.co//EN
      CALSCALE:GREGORIAN
      METHOD:REQUEST
      BEGIN:VEVENT
      UID:${Date.now()}@trophytv.co
      DTSTAMP:${dtStamp}
      DTSTART:${date}
      DTEND:${date}
      SUMMARY:${streamTitle}
      DESCRIPTION:Click the link to join the event: ${streamLink}
      LOCATION:${streamLink}
      STATUS:CONFIRMED
      SEQUENCE:0
      TRANSP:OPAQUE
      END:VEVENT
      END:VCALENDAR
    `.trim();

    await transporter.sendMail({
      from: EMAIL_USER,
      to: user.email,
      subject: subject,
      template: "schedule",
      context: {
        username: user.username,
      },
      icalEvent: {
        filename: "stream-schedule.ics",
        content: icsCalendarContent,
        method: "REQUEST",
      },
    } as MailOptions);
  } catch (error) {
    console.error(error);
    throw new Error("Error sending stream schedule mail");
  }
};
