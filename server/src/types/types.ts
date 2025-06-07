import type { Request } from "express";
import nodemailer from "nodemailer";

export interface CustomRequest extends Request {
    user?: object | string;
}

export type UserProp = {
    email: string;
    username: string;
};

export interface MailOptions extends nodemailer.SendMailOptions {
    template?: string;
    context?: {
        [key: string]: any;
    };
}
