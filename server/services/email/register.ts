import { SERVER_ENV } from "#config/constants.ts";
import { HttpError } from "#middleware/error.ts";
import { logger } from "#utils/logger.ts";

import { transporter } from ".";

export function sendUserRegisteredEmail({ email, username }: { email: string; username: string }) {
    const mail = {
        context: { username },
        from: SERVER_ENV.EMAIL_USER,
        subject: "Welcome to Trophy 🎉",
        template: "new-user",
        to: email,
    };

    transporter.sendMail(mail, function (error, info) {
        if (error) {
            logger.error(error);
            throw new HttpError({ message: "failed to send email", code: 500 });
        }

        logger.info(info, "email sent successfully to user: " + email);
    });
}
