import nodemailer from "nodemailer";
import hbs, { type NodemailerExpressHandlebarsOptions } from "nodemailer-express-handlebars";
import path from "path";

import { SERVER_ENV } from "#config/constants.ts";
import { getCwd } from "#utils/get-cwd.ts";

const { dirname } = getCwd(import.meta.url);
const templatesDir = path.join(dirname, "templates");

export const transporter = nodemailer.createTransport({
    auth: { user: SERVER_ENV.EMAIL_USER, pass: SERVER_ENV.EMAIL_PASSWORD },
    service: "zoho",
});

const options: NodemailerExpressHandlebarsOptions = {
    viewEngine: {
        partialsDir: templatesDir,
        layoutsDir: templatesDir,
        defaultLayout: "base",
    },
    viewPath: templatesDir,
};

transporter.use("compile", hbs(options));
