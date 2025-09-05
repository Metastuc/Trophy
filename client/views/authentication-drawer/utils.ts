import { isAddress } from "viem";
import { z } from "zod";

import { CLIENT_CONSTANTS } from "@/lib/constants";

export const AuthenticationProfileSchema = z.object({
    bio: z.string().optional().nullable(),

    email: z.email("Invalid email address"),

    fc: z.boolean(),

    isNewUser: z.boolean(),

    profilePicture: z.union([
        z
            .instanceof(File)
            .refine(
                (file) => file.size < CLIENT_CONSTANTS.FILE_UPLOAD_MAX_SIZE,
                `File size must be less than ${Math.ceil(CLIENT_CONSTANTS.FILE_UPLOAD_MAX_SIZE / 1000000)}MB`,
            )
            .refine(
                (file) => [...CLIENT_CONSTANTS.FILE_UPLOAD_SUPPORTED_TYPES].includes(file.type),
                "Only JPEG and PNG formats are allowed",
            )
            .optional(),
        z.literal("default-pfp.svg"),
        z.url("Invalid image URL"),
    ]),

    username: z.string().min(3, "Username must be at least 3 characters"),

    walletAddress: z.string().refine(isAddress, "Invalid wallet address"),
});
