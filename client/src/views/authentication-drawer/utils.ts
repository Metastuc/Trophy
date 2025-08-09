import { isAddress } from "viem";
import { z } from "zod";

export const AuthenticationProfileSchema = z.object({
    bio: z.string().optional().nullable(),

    email: z.email("Invalid email address"),

    isNewUser: z.boolean(),

    profilePicture: z.union([
        z
            .instanceof(File)
            .refine((file) => file.size < 10 * 1024 * 1024, "File size must be less than 10MB")
            .refine((file) => ["image/jpeg", "image/png"].includes(file.type), "Only JPEG and PNG formats are allowed")
            .optional(),
        z.literal("default-pfp.svg"),
        z.url("Invalid image URL"),
    ]),

    username: z
        .string()
        .min(3, "Username must be at least 3 characters")
        .regex(
            /^[a-zA-Z_][a-zA-Z0-9_]{0,14}$/,
            "Username must start with a letter or underscore, contain only letters, numbers, and underscores, and be 3 to 15 characters long.",
        ),

    walletAddress: z.string().refine(isAddress, "Invalid wallet address"),
});

export type tAuthenticationProfileSchema = z.infer<typeof AuthenticationProfileSchema>;
