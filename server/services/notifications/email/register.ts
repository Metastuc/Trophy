import { APP_SETTINGS } from "#config/settings.ts";
import { logger } from "#utils/logger.ts";
import { transporter } from ".";

export async function userRegisteredEmail({ email, username }: { email: string; username: string }) {
    try {
        await transporter.sendMail({
            from: APP_SETTINGS.EMAIL_USER,
            to: email,
            subject: "Welcome to Trophy 🎉",
            template: "newUser",
        });
    } catch (error) {
        logger.error(error);
        throw error;
    }
}
