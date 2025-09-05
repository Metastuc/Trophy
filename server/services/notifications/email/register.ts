import { SERVER_ENV } from "#config/settings.ts";
import { logger } from "#utils/logger.ts";

import { transporter } from ".";

export async function userRegisteredEmail({ email, username }: { email: string; username: string }) {
    const mail = {
        context: { username },
        from: SERVER_ENV.EMAIL_USER,
        subject: "Welcome to Trophy 🎉",
        template: "newUser",
        to: email,
    };

    try {
        await transporter.sendMail(mail);
    } catch (error) {
        logger.error(error);
        throw error;
    }
}
