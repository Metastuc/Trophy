import nodemailer from "nodemailer";
import hbs, { type NodemailerExpressHandlebarsOptions } from "nodemailer-express-handlebars";
import path from "path";

import { APP_SETTINGS } from "#config/settings.ts";
import { getCwd } from "#utils/get-cwd.ts";

const { dirname } = getCwd(import.meta.url);
const templatesDir = path.join(dirname, "templates");

export const transporter = nodemailer.createTransport({
    host: APP_SETTINGS.EMAIL_HOST,
    port: APP_SETTINGS.EMAIL_PORT,
    secure: true,
    auth: {
        user: APP_SETTINGS.EMAIL_USER,
        pass: APP_SETTINGS.EMAIL_PASSWORD,
    },
});

const options: NodemailerExpressHandlebarsOptions = {
    viewEngine: {
        partialsDir: templatesDir,
        defaultLayout: false,
    },
    viewPath: templatesDir,
};

transporter.use("compile", hbs(options));
