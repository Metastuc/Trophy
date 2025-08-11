import { z } from "zod";

import { APPLICATION_CONSTANTS } from "@/lib/constants";

export const EditProfileSchema = z.object({
    bio: z.string().optional().nullable(),

    email: z.email("Invalid email address"),

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

    xUrl: z.preprocess(
        (val) => (typeof val === "string" && val.trim() === "" ? null : val),
        z.url("Invalid URL").nullable().optional(),
    ),

    YTUrl: z.preprocess(
        (val) => (typeof val === "string" && val.trim() === "" ? null : val),
        z.url("Invalid URL").nullable().optional(),
    ),
});
