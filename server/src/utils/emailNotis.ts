import nodemailer from "nodemailer";
import hbs, {
	type NodemailerExpressHandlebarsOptions,
} from "nodemailer-express-handlebars";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { EMAIL_SERVICE, EMAIL_USER, EMAIL_PASSWORD } from "./env";
import type { User, MailOptions } from "../type/types";

const __dirname = dirname(fileURLToPath(import.meta.url));

// using gmail service/transport. Will update to Zoho domain email.
const transporter = nodemailer.createTransport({
	service: EMAIL_SERVICE,
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

export const sendRegisterEmail = async (user: User, subject: string) => {
	try {
		await transporter.sendMail({
			from: EMAIL_USER,
			to: user.email,
			subject: subject,
			template: "newUser",
			context: {
				username: user.username
			},
		} as MailOptions);
	} catch (error) {
		console.error(error);
		throw new Error("Error sending Register mail");
	}
};

export const sendStreamEmail = async (user: User, subject: string) => {
	try {
		await transporter.sendMail({
			from: EMAIL_USER,
			to: user.email,
			template: "stream",
			subject: subject,
			context: {
				username: user.username
			},
		} as MailOptions);
	} catch (error) {
		console.error(error);
		throw new Error("Error sending Login mail");
	}
};

