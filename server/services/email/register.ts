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

    return new Promise<void>((resolve, reject) => {
        transporter.sendMail(mail, (error, info) => {
            if (error) {
                logger.error(error);
                return reject(new HttpError({ message: "failed to send email", code: 500, data: error }));
            }

            logger.info(info, "email sent successfully to user: " + email);
            resolve();
        });
    });
}
