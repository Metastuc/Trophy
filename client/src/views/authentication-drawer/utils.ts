import { isAddress } from "viem";
import { z } from "zod";

import { APPLICATION_CONSTANTS } from "@/lib/constants";

export const AuthenticationProfileSchema = z.object({
    bio: z.string().optional().nullable(),

    email: z.email("Invalid email address"),

    isNewUser: z.boolean(),

    profilePicture: z.union([
        z
            .instanceof(File)
            .refine(
                (file) => file.size < APPLICATION_CONSTANTS.FILE_UPLOAD_MAX_SIZE,
                `File size must be less than ${Math.ceil(APPLICATION_CONSTANTS.FILE_UPLOAD_MAX_SIZE / 1000000)}MB`,
            )
            .refine(
                (file) => [...APPLICATION_CONSTANTS.FILE_UPLOAD_SUPPORTED_TYPES].includes(file.type),
                "Only JPEG and PNG formats are allowed",
            )
            .optional(),
        z.literal("default-pfp.svg"),
        z.url("Invalid image URL"),
    ]),

    username: z.string().min(3, "Username must be at least 3 characters"),
    // .regex(
    //     APPLICATION_CONSTANTS.USERNAME_REGEX,
    //     "Username must start with a letter or underscore, contain only letters, numbers, and underscores, and be 3 to 15 characters long.",
    // ),

    walletAddress: z.string().refine(isAddress, "Invalid wallet address"),
});

export type tAuthenticationProfileSchema = z.infer<typeof AuthenticationProfileSchema>;
