import { SERVER_ENV } from "#config/constants.ts";
import { HttpError } from "#middleware/error.ts";
import { logger } from "#utils/logger.ts";

import { transporter } from ".";

export function sendTokenPurchasedEmail({
    amount,
    buyer,
    email,
    username,
}: {
    amount: string;
    buyer: string;
    email: string;
    username: string;
}) {
    const mail = {
        context: { username, buyer, amount },
        from: SERVER_ENV.EMAIL_USER,
        subject: `🎉 $${username} bought`,
        template: "new-purchase",
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
